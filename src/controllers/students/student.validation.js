// error handling 

const { check, validationResult } = require('express-validator'); // importing express validator

const {successResponse, errorResponse} = require('../../libs/response');

// The validateStudent middleware contains a series of validation checks for the incoming request fields.
const validateStudent = [

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

  // Course Name validation
  check('course_name')
    .trim()
    .toLowerCase()
    .notEmpty().withMessage('Invalid course_name: "course_name" should not be empty.')
    .isLength({ min: 3 }).withMessage('Invalid course_name: "course_name" should be at least 3 characters long.')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid course_name: "course_name" should contain only alphabetic characters.'),

  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().map(error => error.msg));
    }
    next();
  }
];

const validateStudentUpdate = [
  // Name validation (optional)
  check('name')
    .optional() // Make this field optional for updates
    .trim() // Remove leading/trailing whitespace
    .isLength({ min: 3 }).withMessage('Invalid name: "name" should be at least 3 characters long.')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid name: "name" should contain only alphabetic characters.'),

  // Address validation (optional)
  check('address')
    .optional() // Make this field optional for updates
    .trim()
    .isLength({ min: 3 }).withMessage('Invalid address: "address" should be at least 3 characters long.')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Invalid address: "address" should not contain special characters.'),

  // Gender validation (optional)
  check('gender')
    .optional() // Make this field optional for updates
    .trim()
    .isIn(['male', 'female', 'others']).withMessage('Invalid gender: "gender" should be one of "male", "female", "others".'),

  // Course Name validation (optional)
  check('course_name')
    .optional() // Make this field optional for updates
    .trim()
    .isLength({ min: 3 }).withMessage('Invalid course_name: "course_name" should be at least 3 characters long.')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid course_name: "course_name" should contain only alphabetic characters.'),

  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().map(error => error.msg));
    }
    next();
  }
];

module.exports = { validateStudent, validateStudentUpdate };
