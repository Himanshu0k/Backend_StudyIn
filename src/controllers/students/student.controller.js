
import studentModel from '../../services/student/student.services.js';
import response from '../../libs/response.js';
import authenticate from '../../libs/middleware/authorization.js'

const studentController = {
    addStudent: (req, res) => { // addstudent function of studentController object

        const students = studentModel.getAllStudents(); 
        const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1; // finding the max id from student model
    
        let { name, address, gender, course_name } = req.body;
    
        // Check if student with this auto-generated ID already exists
        if (studentModel.studentExists(id)) {
            response.errorResponse(res, 'Student with this ID already exists');
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
        response.successResponse(res, 'Added student details successfully', student);
    },
    

    fetchAllStudents: (req, res) => {
        const students = studentModel.getAllStudents();
        response.successResponse(res, 'Fetched student details successfully', students);
    },

    fetchStudentById: (req, res) => {
        const student = studentModel.getStudentById(parseInt(req.params.id));
        let task = req.body.task;

        if (!student) {
            response.errorResponse(res, 'Student not found, Invalid student ID');
        }
        
        task = authenticate.studentRead(task);
        
        response.successResponse(res, 'Fetched single student details successfully , ' + task, student);
    
    },

    removeStudentById: (req, res) => {
        const deletedStudent = studentModel.removeStudentById(parseInt(req.params.id));
        if (!deletedStudent) {
            response.errorResponse(res, 'Student not found, Invalid student ID');
        }
        response.successResponse(res, 'Deleted student details successfully', deletedStudent);
    },

    updateStudentById: (req, res) => {
        const allowedFields = ['name', 'address', 'gender', 'course_name', 'task'];
        const updatedData = req.body;
        let task = req.body.task;

        task = authenticate.studentWrite(task);

        // Find the student by ID
        const student = studentModel.getStudentById(parseInt(req.params.id));
        if (!student) {
            return response.errorResponse(res, 'Student not found, Invalid student ID');
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

                // Update the student field
                student[key] = updatedData[key];
            } 
            else {
                return response.errorResponse(res, `Field "${key}" is not allowed. You can only update name, address, gender, or course_name.`);
            }
        }

        // Update the student in the model
        const updatedStudent = studentModel.updateStudentById(parseInt(req.params.id), student);

        if (!updatedStudent) {
            return response.errorResponse(res, 'An error occurred while updating the student.');
        }

        response.successResponse(res, `Updated student with ID ${req.params.id} successfully , ` + task, updatedStudent);
    }
};

export default studentController;

