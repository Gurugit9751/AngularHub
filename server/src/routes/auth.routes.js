const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const validate = require('../middleware/validate.middleware');

// Register
router.post(
    '/register',
    [
        body('firstName').notEmpty().withMessage('First Name is required'),
        body('lastName').notEmpty().withMessage('Last Name is required'),
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password should be minimum 6 characters')
    ],
    validate,
    authController.register
);

// Login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    validate,
    authController.login
);

// Profile
router.get('/profile', authenticate, authController.profile);

// Update Profile
router.put('/profile', authenticate, authController.updateProfile);

// Change Password
router.put('/change-password', authenticate, authController.changePassword);

// Admin Route
router.get(
    '/admin',
    authenticate,
    authorize('Admin'),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Welcome Admin'
        });
    }
);

module.exports = router;