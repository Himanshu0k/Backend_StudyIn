/* 

This file is used for 
-> used to set up routing for the application
-> creating new instance of a express router
-> impoting package of teacher.controller and teacher response from libs folder
-> defining get, patch, delete and post routes

*/

const express = require('express'); // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

const teacherController = require('./teacher.controller');
const validateTeacher = require('./teacher.validation');

// Define routes
router.post('/', validateTeacher, teacherController.addTeacher);
router.get('/', teacherController.fetchAllTeachers);
router.get('/:id', teacherController.fetchTeacherById);
router.delete('/:id', teacherController.removeTeacherById);
router.patch('/:id', teacherController.updateTeacherById);

module.exports = router;
