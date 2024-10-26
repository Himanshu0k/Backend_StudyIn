// routes/studentRoutes.js


import express from 'express'; // creating an instance of an express router
const router = express.Router(); // router allows to define multiple end points

import studentRoutes from '../controllers/students/student.route.js';
import teacherRoutes from '../controllers/teachers/teacher.route.js';

import tokenVerification from '../libs/middleware/tokenVerification.js';

import loginRoutes from '../controllers/login/login.route.js';

import response from '../libs/response.js';

// used to mount the imported routers to specific base path
router.use("/students", tokenVerification, studentRoutes)

router.use("/teachers", tokenVerification, teacherRoutes)

router.use("/login", loginRoutes)

router.get('/health', (req, res) => {
   response.successResponse(res, 'server is healthy', new Date().toISOString());
});

router.use((req, res) => {
   response.errorResponse(res, 'Invalid route. Only "students" and "teachers" endpoint are supported.')
});

export default router;
