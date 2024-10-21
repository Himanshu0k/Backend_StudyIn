// routes/studentRoutes.js


const express = require('express'); // creating an instance of an express router
const router = express.Router(); // router allows to define multiple end points

const studentRoutes = require('../controllers/students/student.route');
const teacherRoutes = require('../controllers/teachers/teacher.route')

const tokenVerification = require('../libs/middleware/tokenVerification')

const loginRoutes = require('../controllers/login/login.route')

const {successResponse, errorResponse} = require('../libs/response');

// used to mount the imported routers to specific base path
router.use("/students", tokenVerification, studentRoutes)

router.use("/teachers", tokenVerification, teacherRoutes)

router.use("/login", loginRoutes)

router.get('/health', (req, res) => {
   // You can add additional health checks here, such as checking database connectivity
   // const healthStatus = {
   //     status: 'server is healthy',
   //     timestamp: new Date().toISOString(),
   // };

   // res.status(200).json(healthStatus);
   successResponse(res, 'server is healthy', new Date().toISOString());
});

router.use((req, res) => {
   // res.status(404).json({ status: 404, error: 'Invalid route. Only "students" and "teachers" endpoint are supported.' });
   errorResponse(res, 'Invalid route. Only "students" and "teachers" endpoint are supported.')
});

module.exports = router;
