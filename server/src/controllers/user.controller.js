const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

const getUsers = asyncHandler(async (req, res) => {
    const data = await userService.getUsers({
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.search,
        role: req.query.role
    });

    return ApiResponse.success(
        res,
        'Users retrieved successfully',
        data
    );
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(
        req.params.id
    );

    return ApiResponse.success(
        res,
        'User retrieved successfully',
        user
    );
});

const updateUserRole = asyncHandler(async (req, res) => {
    const user = await userService.updateUserRole({
        userId: req.params.id,
        role: req.body.role,
        currentAdminId: req.user.id
    });

    return ApiResponse.success(
        res,
        'User role updated successfully',
        user
    );
});

const deleteUser = asyncHandler(async (req, res) => {
    const data = await userService.deleteUser({
        userId: req.params.id,
        currentAdminId: req.user.id
    });

    return ApiResponse.success(
        res,
        'User deleted successfully',
        data
    );
});

module.exports = {
    getUsers,
    getUserById,
    updateUserRole,
    deleteUser
};
