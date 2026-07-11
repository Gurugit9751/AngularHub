require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../src/models/user.model');

const DUMMY_USERS_URL =
    'https://dummyjson.com/users?limit=100&skip=0';

const DEFAULT_PASSWORD = 'Password@123';

const ADMIN_COUNT = 10;

const connectDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error(
            'MONGO_URI is missing from the server .env file.'
        );
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected for user seeding.');
};

const fetchDummyUsers = async () => {
    console.log('Fetching 100 users from DummyJSON...');

    const response = await fetch(DUMMY_USERS_URL);

    if (!response.ok) {
        throw new Error(
            `DummyJSON request failed with status ${response.status}`
        );
    }

    const result = await response.json();

    if (!Array.isArray(result.users)) {
        throw new Error(
            'DummyJSON response does not contain a users array.'
        );
    }

    return result.users;
};

const normalizeEmail = (email, id) => {
    const safeEmail =
        typeof email === 'string'
            ? email.trim().toLowerCase()
            : '';

    if (safeEmail) {
        return safeEmail;
    }

    return `dummy.user.${id}@angularhub.local`;
};

const mapDummyUser = (
    dummyUser,
    hashedPassword,
    index
) => {
    return {
        firstName:
            dummyUser.firstName?.trim() ||
            `Dummy${index + 1}`,

        lastName:
            dummyUser.lastName?.trim() ||
            'User',

        email: normalizeEmail(
            dummyUser.email,
            dummyUser.id ?? index + 1
        ),

        password: hashedPassword,

        /*
         * First 10 seeded records become Admin.
         * Remaining records become normal users.
         */
        role:
            index < ADMIN_COUNT
                ? 'Admin'
                : 'User'
    };
};

const seedUsers = async () => {
    try {
        await connectDatabase();

        const dummyUsers = await fetchDummyUsers();

        const hashedPassword = await bcrypt.hash(
            DEFAULT_PASSWORD,
            12
        );

        const mappedUsers = dummyUsers.map(
            (dummyUser, index) =>
                mapDummyUser(
                    dummyUser,
                    hashedPassword,
                    index
                )
        );

        const emails = mappedUsers.map(
            (user) => user.email
        );

        /*
         * Find existing users first so current accounts
         * and previously seeded users are preserved.
         */
        const existingUsers = await User.find({
            email: {
                $in: emails
            }
        })
            .select('email')
            .lean();

        const existingEmails = new Set(
            existingUsers.map(
                (user) => user.email.toLowerCase()
            )
        );

        const usersToInsert = mappedUsers.filter(
            (user) =>
                !existingEmails.has(
                    user.email.toLowerCase()
                )
        );

        if (usersToInsert.length === 0) {
            console.log(
                'No users inserted. All DummyJSON emails already exist.'
            );

            return;
        }

        const insertedUsers =
            await User.insertMany(
                usersToInsert,
                {
                    ordered: false
                }
            );

        const insertedAdmins =
            insertedUsers.filter(
                (user) => user.role === 'Admin'
            ).length;

        const insertedRegularUsers =
            insertedUsers.filter(
                (user) => user.role === 'User'
            ).length;

        console.log('===================================');
        console.log('User seed completed successfully');
        console.log('===================================');
        console.log(
            `DummyJSON users fetched: ${dummyUsers.length}`
        );
        console.log(
            `Existing duplicate users skipped: ${existingUsers.length}`
        );
        console.log(
            `New users inserted: ${insertedUsers.length}`
        );
        console.log(
            `Inserted admins: ${insertedAdmins}`
        );
        console.log(
            `Inserted normal users: ${insertedRegularUsers}`
        );
        console.log(
            `Default password: ${DEFAULT_PASSWORD}`
        );
        console.log('===================================');
    } catch (error) {
        console.error('===================================');
        console.error('User seed failed');
        console.error('===================================');
        console.error(error.message);

        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();

        console.log(
            'MongoDB seed connection closed.'
        );
    }
};

seedUsers();
