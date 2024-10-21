// Validation middleware
const { check, validationResult } = require('express-validator'); // importing express validator

const {successResponse, errorResponse} = require('../../libs/response');

// The validateTeacher middleware contains a series of validation checks for the incoming request fields.
const validateTeacher = [
  // Name validation
  check('name')
    .trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Invalid name: "name" should not be empty.')
    .toLowerCase()
    .isLength({ min: 3 }).withMessage('Invalid name: "name" should be at least 3 characters long.')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid name: "name" should contain only alphabetic characters.'),

  // Address validation
  check('address')
    .trim()
    .notEmpty().withMessage('Invalid address: "address" should not be empty.')
    .toLowerCase()
    .isLength({ min: 3 }).withMessage('Invalid address: "address" should be at least 3 characters long.')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Invalid address: "address" should not contain special characters.'),

  // Gender validation
  check('gender')
    .trim()
    .toLowerCase()
    .isIn(['male', 'female', 'others']).withMessage('Invalid gender: "gender" should be one of "male", "female", "others".'),

  // Subject Name validation
  check('subject_name')
    .trim()
    .toLowerCase()
    .notEmpty().withMessage('Invalid subject_name: "subject_name" should not be empty.')
    .isLength({ min: 3 }).withMessage('Invalid subject_name: "subject_name" should be at least 3 characters long.')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid subject_name: "subject_name" should contain only alphabetic characters.'),

  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().map(error => error.msg));
    }
    next();
  }
];

module.exports = validateTeacher;
