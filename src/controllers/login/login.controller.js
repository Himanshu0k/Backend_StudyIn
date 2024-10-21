// controllers/login.controller.js

const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const {successResponse, errorResponse} = require('../../libs/response');

const loginController = {
   login: (req, res) => {
       // Load SECRET_KEY, USERNAME, and PASSWORD from .env
       const SECRET_KEY = process.env.SECRET_KEY;
       const ENV_USERNAME = process.env.LOGIN_USERNAME;
       const ENV_PASSWORD = process.env.PASSWORD;

       const { username, password } = req.body; // request username and password from the user

       // Check if the username matches the one from .env
       if (username !== ENV_USERNAME) {
            errorResponse(res, 'Invalid Username');
       }

       // Check if the password matches the one from .env
       if (password !== ENV_PASSWORD) {
            errorResponse(res, 'Invalid Password');
       }

       // Generate JWT token upon successful login
       const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
       successResponse(res, 'Login successful', token);
   }
};

module.exports = loginController;
