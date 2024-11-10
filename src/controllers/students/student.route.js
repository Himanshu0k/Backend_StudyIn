
import express from 'express'; // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

import studentController from './student.controller.js';
import { validateStudent, validateStudentUpdate, validateTask } from './student.validation.js';

// Define routes
router.post('/', validateStudent, studentController.addStudent);
router.get('/', studentController.fetchAllStudents);
router.get('/:id', validateTask, studentController.fetchStudentById);
router.delete('/:id', studentController.removeStudentById);
router.patch('/:id', validateStudentUpdate, validateTask, studentController.updateStudentById);

export default router;
