/* 

-> import student.service from services/student folder
-> there is an object of studentModel which has different functions :-
1. addStudent - to add the student in the student array
2. fetchAllStudents - to get all the students present in the student array
3. fetchStudentById - pass an id , and fetch the data of that particular student
4. removeStudentById - pass and id, and delete the student with that particular id
5. updateStudentById - pass an id, and update the details of the student at that particular id
    NOTE :- YOU CANNOT CHANGE THE ID OF THE STUDENT

*/

const studentModel = require('../../services/student/student.services');

const studentController = {
    addStudent: (req, res) => { // addstudent function of studentController object

        const students = studentModel.getAllStudents(); 
        const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1; // finding the max id from student model
    
        let { name, address, gender, course_name } = req.body;
    
        // Check if student with this auto-generated ID already exists
        if (studentModel.studentExists(id)) {
            return res.status(400).json({ status: 400, error: 'Student with this ID already exists' });
        }
    
        // Trim the input fields
        name = name.trim();
        address = address.trim();
        gender = gender.trim();
        course_name = course_name.trim();
    
        // Create the new student object
        const student = { id, name, address, gender, course_name };
    
        // Add the student to the model
        studentModel.addStudent(student);
    
        // Respond with success
        res.status(201).json({ status: 201, message: 'Added student details successfully', student });
    },
    

    fetchAllStudents: (req, res) => {
        console.log("kuch bhi")
        const students = studentModel.getAllStudents();
        console.log("kuch bhi  2")
        res.status(200).json({ status: 200, message: 'Fetched student details successfully', students });
    },

    fetchStudentById: (req, res) => {
        const student = studentModel.getStudentById(parseInt(req.params.id));
        if (!student) {
            return res.status(404).json({ status: 404, error: 'Student not found, Invalid student ID' });
        }
        res.status(200).json({ status: 200, message: 'Fetched single student details successfully', student });
    },

    removeStudentById: (req, res) => {
        const deletedStudent = studentModel.removeStudentById(parseInt(req.params.id));
        if (!deletedStudent) {
            return res.status(404).json({ status: 404, error: 'Student not found, Invalid student ID' });
        }
        res.status(200).json({ status: 200, message: 'Deleted student details successfully', deletedStudent });
    },

    updateStudentById: (req, res) => {
        const allowedFields = ['name', 'address', 'gender', 'course_name'];
        const updatedData = req.body;
    
        // Find the student by ID
        const student = studentModel.getStudentById(parseInt(req.params.id));
        if (!student) {
            const errorMessage = 'Student not found, Invalid student ID';
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
                student[key] = updatedData[key].trim().toLowerCase();
            }
    
            // Validate and update address if present
            if (key === 'address') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /^\d+$/.test(updatedData[key]) || /[^a-zA-Z0-9\s]/.test(updatedData[key])) {
                    const errorMessage = 'Invalid address: "address" should not contain only numbers or special characters and should be at least 3 characters long.';
                    console.error(errorMessage);
                    return res.status(400).json({ status: 400, error: errorMessage });
                }
                student[key] = updatedData[key].trim().toLowerCase();
            }
    
            // Validate and update gender if present
            if (key === 'gender') {
                if (!validGenders.includes(updatedData[key].toLowerCase())) {
                    const errorMessage = 'Invalid gender: "gender" should be one of "male", "female", "others".';
                    console.error(errorMessage);
                    return res.status(400).json({ status: 400, error: errorMessage });
                }
                student[key] = updatedData[key].trim().toLowerCase();
            }
    
            // Validate and update course_name if present
            if (key === 'course_name') {
                if (!updatedData[key].trim() || updatedData[key].trim().length < 3 || /^[0-9]+$/.test(updatedData[key]) || /[^a-zA-Z\s]/.test(updatedData[key])) {
                    const errorMessage = 'Invalid course_name: "course_name" should contain only characters and be at least 3 characters long.';
                    console.error(errorMessage);
                    return res.status(400).json({ status: 400, error: errorMessage });
                }
                student[key] = updatedData[key].trim().toLowerCase();
            }
    
            // Reject any fields that are not allowed
            if (!allowedFields.includes(key)) {
                const errorMessage = `Field "${key}" is not allowed. You can only update name, address, gender, or courseName.`;
                console.error(errorMessage);
                return res.status(400).json({ status: 400, error: errorMessage });
            }
        });
    
        // Update the student in the database
        const updatedStudent = studentModel.updateStudentById(parseInt(req.params.id), student);
    
        if (!updatedStudent) {
            const errorMessage = 'An error occurred while updating the student.';
            console.error(errorMessage);
            return res.status(500).json({ status: 500, error: errorMessage });
        }
    
        const message = `Updated student with ID ${req.params.id} successfully`;
        console.log(message);
        res.status(200).json({ status: 200, message, student: updatedStudent });
    }
    
    
    
    
};

module.exports = studentController;
