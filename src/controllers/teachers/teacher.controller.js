const teacherModel = require('../../services/teacher/teacher.services');

const { successResponse, errorResponse } = require('../../libs/response');

const teacherController = {
    addTeacher: (req, res) => {
        // Retrieve the current maximum ID from the teacherModel
        const teachers = teacherModel.getAllTeachers(); // Assuming this function returns all teachers
        const id = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;

        let { name, address, gender, subject_name } = req.body;

        // Check if teacher with this auto-generated ID already exists
        if (teacherModel.teacherExists(id)) {
            return errorResponse(res, 'Teacher with this ID already exists');
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
        return successResponse(res, 'Added teacher details successfully', teacher);
    },

    fetchAllTeachers: (req, res) => {
        const teachers = teacherModel.getAllTeachers();
        return successResponse(res, 'Fetched teacher details successfully', teachers);
    },

    fetchTeacherById: (req, res) => {
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));
        if (!teacher) {
            return errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
        return successResponse(res, 'Fetched single teacher details successfully', teacher);
    },

    removeTeacherById: (req, res) => {
        const deletedTeacher = teacherModel.removeTeacherById(parseInt(req.params.id));
        if (!deletedTeacher) {
            return errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
        return successResponse(res, 'Deleted teacher details successfully', deletedTeacher);
    },

    updateTeacherById: (req, res) => {
        const allowedFields = ['name', 'address', 'gender', 'subject_name'];
        const updatedData = req.body;

        // Find the teacher by ID
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));
        if (!teacher) {
            return errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }

        // Define valid genders
        const validGenders = ['male', 'female', 'others'];

        // Validate and update only the fields that are present in the request body
        Object.keys(updatedData).forEach(key => {
            // Restrict changes to "id"
            if (key === 'id') {
                return errorResponse(res, 'You cannot change the "id".');
            }

            // Validate and update name if present
            if (key === 'name') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /\d/.test(updatedData[key]) || /[^a-zA-Z\s]/.test(updatedData[key])) {
                    return errorResponse(res, 'Invalid name: "name" should be a string with at least 3 characters and no numbers or special characters.');
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Validate and update address if present
            if (key === 'address') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /^\d+$/.test(updatedData[key]) || /[^a-zA-Z0-9\s]/.test(updatedData[key])) {
                    return errorResponse(res, 'Invalid address: "address" should not contain only numbers or special characters and should be at least 3 characters long.');
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Validate and update gender if present
            if (key === 'gender') {
                if (!validGenders.includes(updatedData[key].toLowerCase())) {
                    return errorResponse(res, 'Invalid gender: "gender" should be one of "male", "female", "others".');
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Validate and update subject_name if present
            if (key === 'subject_name') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /^[0-9]+$/.test(updatedData[key]) || /[^a-zA-Z\s]/.test(updatedData[key])) {
                    return errorResponse(res, 'Invalid subject_name: "subject_name" should contain only characters and be at least 3 characters long.');
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Reject any fields that are not allowed
            if (!allowedFields.includes(key)) {
                return errorResponse(res, `Field "${key}" is not allowed. You can only update name, address, gender, or subject_name.`);
            }
        });

        // Update the teacher in the database
        const updatedTeacher = teacherModel.updateTeacherById(parseInt(req.params.id), teacher);

        if (!updatedTeacher) {
            return errorResponse(res, 'An error occurred while updating the teacher.');
        }

        return successResponse(res, `Updated teacher with ID ${req.params.id} successfully`, updatedTeacher);
    }
};

module.exports = teacherController;
