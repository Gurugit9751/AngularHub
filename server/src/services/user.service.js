const User = require('../models/user.model');

const createHttpError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;

    return error;
};

const escapeRegex = (value = '') => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

class UserService {
    async getUsers({
        page = 1,
        limit = 10,
        search = '',
        role = ''
    }) {
        const pageNumber = Math.max(Number(page) || 1, 1);

        const limitNumber = Math.min(
            Math.max(Number(limit) || 10, 1),
            100
        );

        const skip = (pageNumber - 1) * limitNumber;

        const filter = {};

        const trimmedSearch = search.trim();

        if (trimmedSearch) {
            const searchExpression = new RegExp(
                escapeRegex(trimmedSearch),
                'i'
            );

            filter.$or = [
                { firstName: searchExpression },
                { lastName: searchExpression },
                { email: searchExpression }
            ];
        }

        if (role) {
            filter.role = role;
        }

        const [users, total] = await Promise.all([
            User.find(filter)
                .select('-password')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber)
                .lean(),

            User.countDocuments(filter)
        ]);

        return {
            users,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                totalPages: Math.ceil(total / limitNumber)
            }
        };
    }

    async getUserById(userId) {
        const user = await User.findById(userId)
            .select('-password')
            .lean();

        if (!user) {
            throw createHttpError('User not found', 404);
        }

        return user;
    }

    async updateUserRole({
        userId,
        role,
        currentAdminId
    }) {
        const isCurrentAdmin =
            String(userId) === String(currentAdminId);

        if (isCurrentAdmin && role !== 'Admin') {
            throw createHttpError(
                'You cannot remove your own admin role',
                400
            );
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            {
                new: true,
                runValidators: true
            }
        )
            .select('-password')
            .lean();

        if (!user) {
            throw createHttpError('User not found', 404);
        }

        return user;
    }

    async deleteUser({
        userId,
        currentAdminId
    }) {
        const isCurrentAdmin =
            String(userId) === String(currentAdminId);

        if (isCurrentAdmin) {
            throw createHttpError(
                'You cannot delete your own account',
                400
            );
        }

        const user = await User.findById(userId)
            .select('_id')
            .lean();

        if (!user) {
            throw createHttpError('User not found', 404);
        }

        await User.deleteOne({ _id: userId });

        return {
            id: userId
        };
    }
}

module.exports = new UserService();
