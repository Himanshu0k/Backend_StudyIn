/* global process */
// controllers/login.controller.js

import {} from 'express-validator';
import jwt from 'jsonwebtoken';

import response from '../../libs/response.js';

const loginController = {
   login: (req, res) => {
       // Load SECRET_KEY, USERNAME, and PASSWORD from .env
       const SECRET_KEY = process.env.SECRET_KEY;
       const ENV_USERNAME = process.env.LOGIN_USERNAME;
       const ENV_PASSWORD = process.env.PASSWORD;

       const { username, password } = req.body; // request username and password from the user

       // Check if the username matches the one from .env
       if (username !== ENV_USERNAME) {
            response.errorResponse(res, 'Invalid Username');
       }

       // Check if the password matches the one from .env
       if (password !== ENV_PASSWORD) {
            response.errorResponse(res, 'Invalid Password');
       }

       // Generate JWT token upon successful login
       const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
       response.successResponse(res, 'Login successful', token);
   }
};

export default loginController;
