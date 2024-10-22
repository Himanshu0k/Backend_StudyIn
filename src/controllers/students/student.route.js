/* 

This file is used for 
-> used to set up routing for the application
-> creating new instance of a express router
-> impoting package of student.controller and student response from libs folder
-> defining get, patch, delete and post routes

*/

import express from 'express'; // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

import studentController from './student.controller.js';
import { validateStudent, validateStudentUpdate } from './student.validation.js';

// Define routes
router.post('/', validateStudent, studentController.addStudent);
router.get('/', studentController.fetchAllStudents);
router.get('/:id', studentController.fetchStudentById);
router.delete('/:id', studentController.removeStudentById);
router.patch('/:id', validateStudentUpdate, studentController.updateStudentById);

export default router;
