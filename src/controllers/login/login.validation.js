// validations/login.validation.js

import { body } from 'express-validator';

const loginValidation = [
    body('username')
        .notEmpty().withMessage('Username is required.')
        .isString().withMessage('Username must be a string.'),
    
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isString().withMessage('Password must be a string.')
];

export default loginValidation;
