// routes/studentRoutes.js

import express from 'express'; // creating an instance of an express router
const router = express.Router(); // router allows to define multiple end points

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../libs/swagger.js';

import studentRoutes from '../controllers/students/student.route.js';
import teacherRoutes from '../controllers/teachers/teacher.route.js';
import attendenceRoutes from '../controllers/attendence/attendence.route.js';

import loginRoute from '../controllers/login/login.route.js';

import tokenVerification from '../libs/middleware/tokenVerification.js';

import response from '../libs/response.js';

import studentController from '../controllers/students/student.controller.js';
import teacherController from '../controllers/teachers/teacher.controller.js';
import loginController from '../controllers/login/login.controller.js';
import attendanceController from '../controllers/attendence/attendence.controller.js';

router.use('/user', loginRoute)

// used to mount the imported routers to specific base path
router.use("/students", tokenVerification, studentRoutes)
router.use("/teachers", tokenVerification, teacherRoutes)
router.use("/attendence", tokenVerification, attendenceRoutes)

router.get('/health', (req, res) => {
   response.successResponse(res, 'server is healthy', new Date().toISOString());
});

const swaggerSpec = swaggerJSDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

router.post('/students', studentController.addStudent); // Add student
router.get('/students', studentController.fetchAllStudents); // Fetch all students
router.get('/students/:id', studentController.fetchStudentById); // Fetch student by ID
router.delete('/students/:id', studentController.removeStudentById); // Remove student by ID
router.patch('/students/:id', studentController.updateStudentById); // Update student by ID

router.post('/teachers', teacherController.addTeacher); // Add student
router.get('/teachers', teacherController.fetchAllTeachers); // Fetch all students
router.get('/teachers/:id', teacherController.fetchTeacherById); // Fetch student by ID
router.delete('/teachers/:id', teacherController.removeTeacherById); // Remove student by ID
router.patch('/teachers/:id', teacherController.updateTeacherById); // Update student by ID

router.post('/login', loginController.login);

router.get('/attendence/students', attendanceController.getStudents)
router.patch('/attendence/updateAttendence', attendanceController.updateStudentAttendance)

// router.use( {
//    response.errorResponse( 'Invalid route. Only "students" and "teachers" endpoint are supported.')
// });

router.use((req, res) => {
   try {
       throw new Error('Route does not exist');
   } catch (error) {
       response.errorResponse(res, error.message);
   }
});

export default router;
