/* 

This file is used for 
-> used to set up routing for the application
-> creating new instance of a express router
-> impoting package of login.controller
-> defining get and post routes for login and verifying tokens

*/

import express from 'express'; // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

import loginController from './login.controller.js';
import loginValidator from './login.validation.js';

// Define routes
router.post('/',loginValidator, loginController.login);

export default router;
