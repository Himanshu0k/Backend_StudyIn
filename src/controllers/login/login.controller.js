/* global process */

import {} from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import response from '../../libs/response.js';

const loginController = {
   login: (req, res) => {
       // Load SECRET_KEY, USERNAME, and HASHED_PASSWORD from .env
       const SECRET_KEY = process.env.SECRET_KEY;
       const ENV_USERNAME = process.env.LOGIN_USERNAME;
       const HASHED_PASSWORD = process.env.HASHED_PASSWORD;

       const { username, password } = req.body; // Get username and password from the request

       // Check if the username matches the one from .env
       if (username !== ENV_USERNAME) {
           return response.errorResponse(res, 'Invalid Username');
       }

       try {
           // Check if the provided password matches the hashed password
           const isPasswordValid = bcrypt.compare(password, HASHED_PASSWORD);
           if (!isPasswordValid) {
               return response.errorResponse(res, 'Invalid Password');
           }

           // Generate JWT token upon successful login
           const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
           return response.successResponse(res, 'Login successful', token);
       } catch (error) {
           console.error('Error comparing passwords:', error);
           return response.errorResponse(res, 'An error occurred');
       }
   }
};

export default loginController;
