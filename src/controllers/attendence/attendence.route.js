import express from 'express'; // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

import attendanceController from './attendence.controller.js';

router.patch('/students', attendanceController.getStudents);
router.patch('/updateAttendence', attendanceController.updateStudentAttendance);


export default router;
