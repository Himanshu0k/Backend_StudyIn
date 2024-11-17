
import studentModel from '../../services/student/student.services.js';
import response from '../../libs/response.js';
import authenticate from '../../libs/middleware/authorization.js'
// import { Types } from 'mongoose';

const studentController = {
    /**
     * @swagger
     * /students:
     *   post:
     *     summary: Add a new student
     *     description: Adds a new student to the system.
     *     tags: [Students]
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               address:
     *                 type: string
     *               gender:
     *                 type: string
     *               course_name:
     *                 type: string
     *               attendence:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successfully added student
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 student:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: integer
     *                     name:
     *                       type: string
     *                     address:
     *                       type: string
     *                     gender:
     *                       type: string
     *                     course_name:
     *                       type: string
     *       400:
     *         description: Error when adding student
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */

    addStudent: async (req, res) => {
        try {
        const students = await studentModel.getAllStudents(); 
        const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1; // finding the max id from student model
    
        let { name, address, gender, course_name } = req.body;
            
        // const objectId = new Types.ObjectId(id.toString);
        // Check if student with this auto-generated ID already exists
        if (await studentModel.studentExists(id)) {
            return response.errorResponse(res, 'Student with this ID already exists');
        }
    
        // Trim the input fields
        name = name.trim();
        address = address.trim();
        gender = gender.trim();
        course_name = course_name.trim();
        const attendence = 'absent';
    
        // Create the new student object
        const student = { id, name, address, gender, course_name, attendence};
    
        // Add the student to the model
        const savedStudent = await studentModel.addStudent(student);
    
        // Return the student object excluding 'attendance'
        const studentWithoutAttendance = { ...savedStudent.toObject() };
        delete studentWithoutAttendance.attendence;  // Remove the attendance property
    
        // Respond with success, returning the student without the 'attendance' property
        return response.successResponse(res, 'Added student details successfully', studentWithoutAttendance);
        }
        catch(error) {
            return response.errorResponse(res, 'Error adding student : ' + error.message);
        }
    },
    
    

    /**
     * @swagger
     * /students:
     *   get:
     *     summary: Fetch all students
     *     description: Fetches the list of all students in the system.
     *     tags: [Students]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully fetched students
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *                   address:
     *                     type: string
     *                   gender:
     *                     type: string
     *                   course_name:
     *                     type: string
     */
    fetchAllStudents: async (req, res) => {
        try {
        const students = await studentModel.getAllStudents();
    
        // Remove the 'attendance' property from each student before returning the response
        const studentsWithoutAttendance = students.map(student => {
            // Create a shallow copy of the student object and delete 'attendance'
            const studentWithoutAttendance = { ...student };
            delete studentWithoutAttendance.attendence;  // Removing the 'attendance' property
            return studentWithoutAttendance;
        });
    
        // Respond with the updated list of students (without 'attendance')
        response.successResponse(res, 'Fetched student details successfully', studentsWithoutAttendance);
        }
        catch(error) {
            return response.errorResponse(res, 'Error fetching details of student : ' + error.message);
        }
    },
    

    /**
     * @swagger
     * /students/{id}:
     *   get:
     *     summary: Fetch a student by ID
     *     description: Fetches a student's details using the student ID.
     *     tags: [Students]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the student to fetch
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Successfully fetched student
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 address:
     *                   type: string
     *                 gender:
     *                   type: string
     *                 course_name:
     *                   type: string
     *       400:
     *         description: Student not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    fetchStudentById: async (req, res) => {
        try {
        const student = await studentModel.getStudentById(parseInt(req.params.id));
        let task = req.body.task;
    
        if (!student) {
            response.errorResponse(res, 'Student not found, Invalid student ID');
            return;  // Exit early if the student is not found
        }
    
        // Remove the 'attendance' property from the student object before returning it
        const studentWithoutAttendance = { ...student.toObject() };
        delete studentWithoutAttendance.attendence;  // Removing the 'attendance' property
    
        task = authenticate.studentRead(task);
    
        // Respond with the student data excluding the 'attendance' property
        response.successResponse(res, 'Fetched single student details successfully, ' + task, studentWithoutAttendance);
        }
        catch(error) {
            return response.errorResponse(res, 'Error finding student : ' + error.message);
        }
    },
    

    /**
     * @swagger
     * /students/{id}:
     *   delete:
     *     summary: Remove a student by ID
     *     description: Deletes a student using the student ID.
     *     tags: [Students]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the student to delete
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted student
     *       400:
     *         description: Student not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    removeStudentById: async (req, res) => {
        try {
        const deletedStudent = await studentModel.removeStudentById(parseInt(req.params.id));
    
        if (!deletedStudent) {
            response.errorResponse(res, 'Student not found, Invalid student ID');
            return;  // Exit early if the student was not found
        }
    
        // Remove the 'attendance' property from the deleted student before returning it
        const studentWithoutAttendance = { ...deletedStudent };
        delete studentWithoutAttendance.attendence;  // Remove the 'attendance' property
    
        // Respond with the deleted student data excluding the 'attendance' property
        response.successResponse(res, 'Deleted student details successfully', studentWithoutAttendance);
        }
        catch(error) {
            return response.errorResponse(res, 'Error deleting student data : ' + error.message);
        }
    },
    

    /**
     * @swagger
     * /students/{id}:
     *   patch:
     *     summary: Update student details by ID
     *     description: Updates student information using the student ID.
     *     tags: [Students]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the student to update
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               address:
     *                 type: string
     *               gender:
     *                 type: string
     *               course_name:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successfully updated student
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 address:
     *                   type: string
     *                 gender:
     *                   type: string
     *                 course_name:
     *                   type: string
     *       400:
     *         description: Student not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    updateStudentById: async (req, res) => {
        try {
        let task = req.body.task;
        task = authenticate.studentWrite(task);
    
        const student = await studentModel.getStudentById(parseInt(req.params.id));
        if (!student) {
            return response.errorResponse(res, 'Student not found, Invalid student ID');
        }
    
        // Update student fields based on the request
        Object.keys(req.body).forEach(key => {
            if (req.body[key] && key !== 'attendance') {  // Ensure 'attendance' is not updated
                student[key] = req.body[key].trim().toLowerCase(); // Normalize input
            }
        });
    
        const updatedStudent = await studentModel.updateStudentById(parseInt(req.params.id), student);
    
        if (!updatedStudent) {
            return response.errorResponse(res, 'Student not found, Invalid student ID');
        }
    
        // Remove 'attendance' from the updated student before returning
        const studentWithoutAttendance = { ...updatedStudent.toObject() };
        delete studentWithoutAttendance.attendence;  // Remove the 'attendance' property
    
        // Respond with success
        response.successResponse(res, `Updated student with ID ${req.params.id} successfully, ` + task, studentWithoutAttendance);
    }
    catch(error) {
        return response.errorResponse(res, 'Error updating student : ' + error.message);
    }
    }
       
};

export default studentController;


// kcbsnlkcnpisv  


// djvbljldnlcknsldnl