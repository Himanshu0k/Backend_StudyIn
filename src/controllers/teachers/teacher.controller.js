/* 

-> import teacher.service from services/teacher folder
-> there is an object of teacherModel which has different functions :-
1. addTeacher - to add the teacher in the teacher array
2. fetchAllTeachers - to get all the teachers present in the teacher array
3. fetchTeacherById - pass an id , and fetch the data of that particular teacher
4. removeTeacherById - pass and id, and delete the teacher with that particular id
5. updateTeacherById - pass an id, and update the details of the teacher at that particular id
    NOTE :- YOU CANNOT CHANGE THE ID OF THE TEACHER

*/

const teacherModel = require('../../services/teacher/teacher.services');

const teacherController = {
    addTeacher: (req, res) => {
        
        // Retrieve the current maximum ID from the teacherModel
        const teachers = teacherModel.getAllTeachers(); // Assuming this function returns all teachers
        const id = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;

        let { name, address, gender, subject_name } = req.body;

        // Check if teacher with this auto-generated ID already exists
        if (teacherModel.teacherExists(id)) {
            return res.status(400).json({ status: 400, error: 'Teacher with this ID already exists' });
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
        res.status(201).json({ status: 201, message: 'Added teacher details successfully', teacher });
    },

    fetchAllTeachers: (req, res) => {
        const teachers = teacherModel.getAllTeachers();
        res.status(200).json({ status: 200, message: 'Fetched teacher details successfully', teachers });
    },

    fetchTeacherById: (req, res) => {
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));
        if (!teacher) {
            return res.status(404).json({ status: 404, error: 'Teacher not found, Invalid teacher ID' });
        }
        res.status(200).json({ status: 200, message: 'Fetched single teacher details successfully', teacher });
    },

    removeTeacherById: (req, res) => {
        const deletedTeacher = teacherModel.removeTeacherById(parseInt(req.params.id));
        if (!deletedTeacher) {
            return res.status(404).json({ status: 404, error: 'Teacher not found, Invalid teacher ID' });
        }
        res.status(200).json({ status: 200, message: 'Deleted teacher details successfully', deletedTeacher });
    },

    updateTeacherById: (req, res) => {
        const allowedFields = ['name', 'address', 'gender', 'subject_name'];
        const updatedData = req.body;

        // Find the teacher by ID
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));
        if (!teacher) {
            const errorMessage = 'Teacher not found, Invalid teacher ID';
            console.error(errorMessage);
            return res.status(404).json({ status: 404, error: errorMessage });
        }

        // Define valid genders
        const validGenders = ['male', 'female', 'others'];

        // Validate and update only the fields that are present in the request body
        Object.keys(updatedData).forEach(key => {
            // Restrict changes to "id"
            if (key === 'id') {
                const errorMessage = 'You cannot change the "id".';
                console.error(errorMessage);
                return res.status(400).json({ status: 400, error: errorMessage });
            }

            // Validate and update name if present
            if (key === 'name') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /\d/.test(updatedData[key]) || /[^a-zA-Z\s]/.test(updatedData[key])) {
                    const errorMessage = 'Invalid name: "name" should be a string with at least 3 characters and no numbers or special characters.';
                    console.error(errorMessage);
                    return res.status(400).json({ status: 400, error: errorMessage });
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Validate and update address if present
            if (key === 'address') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /^\d+$/.test(updatedData[key]) || /[^a-zA-Z0-9\s]/.test(updatedData[key])) {
                    const errorMessage = 'Invalid address: "address" should not contain only numbers or special characters and should be at least 3 characters long.';
                    console.error(errorMessage);
                    return res.status(400).json({ status: 400, error: errorMessage });
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Validate and update gender if present
            if (key === 'gender') {
                if (!validGenders.includes(updatedData[key].toLowerCase())) {
                    const errorMessage = 'Invalid gender: "gender" should be one of "male", "female", "others".';
                    console.error(errorMessage);
                    return res.status(400).json({ status: 400, error: errorMessage });
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Validate and update subject_name if present
            if (key === 'subject_name') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /^[0-9]+$/.test(updatedData[key]) || /[^a-zA-Z\s]/.test(updatedData[key])) {
                    const errorMessage = 'Invalid subject_name: "subject_name" should contain only characters and be at least 3 characters long.';
                    console.error(errorMessage);
                    return res.status(400).json({ status: 400, error: errorMessage });
                }
                teacher[key] = updatedData[key].trim().toLowerCase();
            }

            // Reject any fields that are not allowed
            if (!allowedFields.includes(key)) {
                const errorMessage = `Field "${key}" is not allowed. You can only update name, address, gender, or subject_name.`;
                console.error(errorMessage);
                return res.status(400).json({ status: 400, error: errorMessage });
            }
        });

        // Update the teacher in the database
        const updatedTeacher = teacherModel.updateTeacherById(parseInt(req.params.id), teacher);

        if (!updatedTeacher) {
            const errorMessage = 'An error occurred while updating the teacher.';
            console.error(errorMessage);
            return res.status(500).json({ status: 500, error: errorMessage });
        }

        const message = `Updated teacher with ID ${req.params.id} successfully`;
        console.log(message);
        res.status(200).json({ status: 200, message, teacher: updatedTeacher });
    }
};

module.exports = teacherController;
