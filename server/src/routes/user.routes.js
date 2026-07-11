const express = require('express');

const {
    body,
    param,
    query
} = require('express-validator');

const userController = require(
    '../controllers/user.controller'
);

const authenticate = require(
    '../middleware/auth.middleware'
);

const authorize = require(
    '../middleware/authorize.middleware'
);

const validate = require(
    '../middleware/validate.middleware'
);

const router = express.Router();

/*
 * Every /api/users endpoint requires:
 * 1. A valid JWT token
 * 2. Admin role
 */
router.use(
    authenticate,
    authorize('Admin')
);

router.get(
    '/',
    [
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Page must be greater than 0'),

        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Limit must be between 1 and 100'),

        query('search')
            .optional({ checkFalsy: true })
            .isString()
            .trim()
            .isLength({ max: 100 })
            .withMessage(
                'Search cannot exceed 100 characters'
            ),

        query('role')
            .optional({ checkFalsy: true })
            .isIn(['Admin', 'User'])
            .withMessage('Role must be Admin or User')
    ],
    validate,
    userController.getUsers
);

router.get(
    '/:id',
    [
        param('id')
            .isMongoId()
            .withMessage('Valid user ID is required')
    ],
    validate,
    userController.getUserById
);

router.patch(
    '/:id/role',
    [
        param('id')
            .isMongoId()
            .withMessage('Valid user ID is required'),

        body('role')
            .isIn(['Admin', 'User'])
            .withMessage('Role must be Admin or User')
    ],
    validate,
    userController.updateUserRole
);

router.delete(
    '/:id',
    [
        param('id')
            .isMongoId()
            .withMessage('Valid user ID is required')
    ],
    validate,
    userController.deleteUser
);

module.exports = router;
