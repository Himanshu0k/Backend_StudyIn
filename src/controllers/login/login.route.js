/* 

This file is used for 
-> used to set up routing for the application
-> creating new instance of a express router
-> impoting package of login.controller
-> defining get and post routes for login and verifying tokens

*/

const express = require('express'); // used to set up routing for the application
const router = express.Router(); // creating new instance of a express router

const loginController = require('./login.controller');
const loginValidator = require('./login.validation');

// Define routes
router.post('/',loginValidator, loginController.login);

module.exports = router;
