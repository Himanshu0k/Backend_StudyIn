/* 

This file is used for 
-> used to set up routing for the application
-> creating new instance of a express router
-> impoting package of teacher.controller and teacher response from libs folder
-> defining get, patch, delete and post routes

*/

import express from 'express'; // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

import teacherController from './teacher.controller.js';
import {validateTeacher, validateTeacherUpdate, validateTask} from './teacher.validation.js';

// Define routes
router.post('/', validateTeacher, teacherController.addTeacher);
router.get('/', teacherController.fetchAllTeachers);
router.get('/:id', validateTask, teacherController.fetchTeacherById);
router.delete('/:id', teacherController.removeTeacherById);
router.patch('/:id', validateTeacherUpdate, validateTask, teacherController.updateTeacherById);

export default router;
