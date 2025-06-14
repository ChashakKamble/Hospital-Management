const { body } = require('express-validator');

exports.registerDoctorValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Invalid email address'),

  body('contact')
    .matches(/^[0-9]{10}$/)
    .withMessage('Contact number must be exactly 10 digits'),

  body('role')
    .equals('Doctor')
    .withMessage('Role must be Doctor'),

  body('speci')
    .notEmpty()
    .withMessage('Specialization is required'),

  body('exp')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be a number between 0 and 50'),

  body('status')
    .isIn(['Available', 'On leave', 'Busy', 'Inactive'])
    .withMessage('Status must be one of: Available, On leave, Busy, Inactive')
];
    