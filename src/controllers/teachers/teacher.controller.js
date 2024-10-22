import teacherModel from '../../services/teacher/teacher.services.js';
import response from '../../libs/response.js';
import authenticate from '../../libs/middleware/authorization.js'; // Import the authentication module

const teacherController = {
    addTeacher: (req, res) => {
        const teachers = teacherModel.getAllTeachers(); // Get all teachers
        const id = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1; // Finding the max ID

        let { name, address, gender, subject_name } = req.body;

        // Check if teacher with this auto-generated ID already exists
        if (teacherModel.teacherExists(id)) {
            return response.errorResponse(res, 'Teacher with this ID already exists');
        }

        // Trim the input fields
        name = name.trim();
        address = address.trim();
        gender = gender.trim();
        subject_name = subject_name.trim();

        // Create the new teacher object
        const teacher = { id, name, address, gender, subject_name };

        // Add the teacher to the model
        teacherModel.addTeacher(teacher);

        // Respond with success
        return response.successResponse(res, 'Added teacher details successfully', teacher);
    },

    fetchAllTeachers: (req, res) => {
        const teachers = teacherModel.getAllTeachers();
        return response.successResponse(res, 'Fetched teacher details successfully', teachers);
    },

    fetchTeacherById: (req, res) => {
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));

        let task = req.body.task; // Assuming 'task' is part of the request body

        task = authenticate.teacherRead(task); // Authenticate permissions
        
        if (!teacher) {
            return response.errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
        return response.successResponse(res, 'Fetched single teacher details successfully , ' + task, teacher);
    },

    removeTeacherById: (req, res) => {
        const deletedTeacher = teacherModel.removeTeacherById(parseInt(req.params.id));
        if (!deletedTeacher) {
            return response.errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
        return response.successResponse(res, 'Deleted teacher details successfully', deletedTeacher);
    },

    updateTeacherById: (req, res) => {
        const allowedFields = ['name', 'address', 'gender', 'subject_name', 'task'];
        const updatedData = req.body;
        
        let task = req.body.task; // Assuming 'task' is part of the request body

        task = authenticate.teacherWrite(task); // Authenticate permissions

        // Find the teacher by ID
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));
        if (!teacher) {
            return response.errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }

        // Validate and update only the fields that are present in the request body
        for (const key of Object.keys(updatedData)) {
            // Restrict changes to "id"
            if (key === 'id') {
                return response.errorResponse(res, 'You cannot change the id');
            }

            // Validate and update each allowed field
            if (allowedFields.includes(key)) {
                updatedData[key] = updatedData[key].trim().toLowerCase(); // Normalize input

                // Update the teacher field
                teacher[key] = updatedData[key];
            } else {
                return response.errorResponse(res, `Field "${key}" is not allowed. You can only update name, address, gender, or subject_name.`);
            }
        }

        // Update the teacher in the model
        const updatedTeacher = teacherModel.updateTeacherById(parseInt(req.params.id), teacher);

        if (!updatedTeacher) {
            return response.errorResponse(res, 'An error occurred while updating the teacher.');
        }

        return response.successResponse(res, `Updated teacher with ID ${req.params.id} successfully , ` + task, updatedTeacher);
    }
};

export default teacherController;
