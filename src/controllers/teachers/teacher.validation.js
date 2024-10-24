// Validation middleware
import { check, validationResult } from 'express-validator'; // importing express validator
import response from '../../libs/response.js';

const allowedUpdateFields = ['name', 'address', 'gender', 'subject_name', 'task']; // Define allowed fields for teacher update

// The validateTeacher middleware contains a series of validation checks for the incoming request fields.
export const validateTeacher = [
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
      return response.errorResponse(res, errors.array().map(error => error.msg));
    }
    next();
  }
];

export const validateTeacherUpdate = [
  // Custom validation to ensure only allowed fields are present in the update request
  (req, res, next) => {
      const updateFields = Object.keys(req.body);
      const invalidFields = updateFields.filter(field => !allowedUpdateFields.includes(field));

      if (invalidFields.length > 0) {
          return response.errorResponse(res, `Invalid fields: ${invalidFields.join(', ')}. You can only update the following fields: ${allowedUpdateFields.join(', ')}`);
      }
      next();
  },

  // Name validation (optional)
  check('name')
      .optional()
      .trim()
      .isLength({ min: 3 }).withMessage('Invalid name: "name" should be at least 3 characters long.')
      .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid name: "name" should contain only alphabetic characters.'),

  // Address validation (optional)
  check('address')
      .optional()
      .trim()
      .isLength({ min: 3 }).withMessage('Invalid address: "address" should be at least 3 characters long.')
      .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Invalid address: "address" should not contain special characters.'),

  // Gender validation (optional)
  check('gender')
      .optional()
      .trim()
      .isIn(['male', 'female', 'others']).withMessage('Invalid gender: "gender" should be one of "male", "female", "others".'),

  // Subject Name validation (optional)
  check('subject_name')
      .optional()
      .trim()
      .isLength({ min: 3 }).withMessage('Invalid subject_name: "subject_name" should be at least 3 characters long.')
      .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid subject_name: "subject_name" should contain only alphabetic characters.'),

  // Middleware to handle validation result
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return response.errorResponse(res, errors.array().map(error => error.msg).join(', '));
      }
      next();
  }
];

export const validateTask = [
  check('task')
      .optional()
      .trim()
      .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid task: "task" should contain only alphabetic characters.'),
      
  // Middleware to handle validation result
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return response.errorResponse(res, errors.array().map(error => error.msg).join(', '));
      }
      next();
  }
];
