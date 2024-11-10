import attendanceModel from '../../services/attendence/attendence.service.js'; 
import response from '../../libs/response.js';

/**
 * @swagger
 * /attendence/students:
 *   patch:
 *     summary: Fetch all students enrolled in a specific class for a given teacher
 *     description: Retrieves the list of students in a specific course/class for a teacher by using the teacher's ID and the class name.
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: [] # Assumes JWT authentication or similar is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_name:
 *                 type: string
 *                 description: The name of the course/class to fetch students for
 *                 example: Math101
 *               teacher_id:
 *                 type: integer
 *                 description: The ID of the teacher associated with the class
 *                 example: 123
 *     responses:
 *       200:
 *         description: Successfully fetched students for the class and teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fetched students successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       student_id:
 *                         type: integer
 *                         description: Unique identifier for the student
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The name of the student
 *                         example: John Doe
 *                       class_name:
 *                         type: string
 *                         description: The name of the class the student is enrolled in
 *                         example: Math101
 *       400:
 *         description: Error fetching students for the class and teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Teacher not found or No students found for this class and teacher
 */

/**
 * @swagger
 * /attendence/updateAttendence:
 *   patch:
 *     summary: Update attendance for a specific student
 *     description: Updates the attendance record of a specific student using the student's ID and attendance data.
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: [] # Assumes JWT authentication or similar is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: The ID of the student
 *                 example: 1
 *               attendanceData:
 *                 type: string
 *                 description: Attendance status to be recorded (e.g., 'present', 'absent', 'late')
 *                 example: 'present'
 *     responses:
 *       200:
 *         description: Successfully updated attendance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendance updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     student_id:
 *                       type: integer
 *                       description: Unique identifier for the student
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The name of the student
 *                       example: John Doe
 *                     attendance:
 *                       type: string
 *                       description: Attendance status to be recorded (e.g., 'present', 'absent', 'late')
 *                       example: "present" 
 *       400:
 *         description: Error updating attendance for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student not found or invalid data
 */

class AttendanceController {
    getStudents(req, res) {
        const { course_name, teacher_id } = req.body;

        // Check if teacher exists
        const teacherExists = attendanceModel.checkTeacher(teacher_id);
        if (!teacherExists) {
            return response.errorResponse(res, 'Teacher not found');
        }

        // Get students enrolled in the class for the given teacher
        const studentsInClass = attendanceModel.getStudentsInClass(course_name);

        if (!studentsInClass || studentsInClass.length === 0) {
            return response.errorResponse(res, 'No students found for this class and teacher');
        }

        // Respond with the students list
        response.successResponse(res, 'Fetched students successfully', studentsInClass);
    }

    updateStudentAttendance(req, res) {
        const { student_id, attendanceData } = req.body;

        const updatedStudent = attendanceModel.updateStudentAttendance(student_id, attendanceData);

        if (!updatedStudent) {
            return response.errorResponse(res, 'Student not found');
        }

        // Respond with the updated student data
        response.successResponse(res, 'Attendance updated successfully', updatedStudent);
    }
}

const attendanceController = new AttendanceController();
export default attendanceController;
