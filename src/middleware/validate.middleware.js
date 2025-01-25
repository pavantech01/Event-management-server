const { body, validationResult } = require('express-validator');
const { ApiError } = require('../utils/apiError');

const validations = {
    // register: [
    //     body('fullName').trim().notEmpty().withMessage('Full name is required'),
    //     body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
    //     body('email').isEmail().withMessage('Invalid email address'),
    //     body('password')
    //         .isLength({ min: 8 })
    //         .withMessage('Password must be at least 8 characters long'),
    //     body('confirmPassword')
    //         .custom((value, { req }) => {
    //             if (value !== req.body.password) {
    //                 throw new Error('Passwords do not match');
    //             }
    //             return true;
    //         })
    // ],
    register: [
        body('fullName').trim().notEmpty().withMessage('Full name is required'),
        body('phone').trim().notEmpty().withMessage('Phone number is required'), // Change 'phoneNumber' to 'phone'
        body('email').isEmail().withMessage('Invalid email address'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
    ],
    login: [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    
    event: [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('date').isISO8601().withMessage('Invalid date format'),
        body('price').isNumeric().withMessage('Price must be a number')
    ]
};

const validate = (validationType) => {
    return [
        validations[validationType],
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.error('Validation errors:', errors.array());
                return res.status(400).json({ message: 'Validation error', errors: errors.array() });
            }            
            next();
        }
    ];
};

module.exports = { validate };
