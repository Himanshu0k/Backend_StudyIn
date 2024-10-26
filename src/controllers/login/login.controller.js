/* global process */
import jwt from 'jsonwebtoken';
import response from '../../libs/response.js';
import checkPassword from '../../libs/password.utility.js';
import generateHash from '../../libs/password.hash.utility.js';

const loginController = {
    signUp: (req, res) => {
        let { username, password } = req.body;
        generateHash(username, password);
        response.successResponse(res, 'Successfully signed up');
    },

    login: (req, res) => {
        const SECRET_KEY = process.env.SECRET_KEY;
        const ENV_USERNAME = process.env.LOGIN_USERNAME; // This should be fetched from .env

        let { username, password } = req.body;

        if (username !== ENV_USERNAME) {
            return response.errorResponse(res, 'Invalid Username');
        }

        try {
            const isPasswordValid = checkPassword(password);
            
            if (isPasswordValid) {
                const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
                return response.successResponse(res, 'Login successful', token);
            } else {
                return response.errorResponse(res, 'Invalid Password');
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return response.errorResponse(res, 'An error occurred during login');
        }
    }
};

export default loginController;
