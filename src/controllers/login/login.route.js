
import express from 'express'; // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

import loginController from './login.controller.js';
import loginValidator from './login.validation.js';

// Define routes
router.post('/login',loginValidator, loginController.login);

export default router;
