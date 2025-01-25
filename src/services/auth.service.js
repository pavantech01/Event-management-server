const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

const authService = {
    register: async (fullName, phoneNumber, email, password, role) => {
        try {
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                fullName,
                phoneNumber,
                email: email.toLowerCase(),
                password: hashedPassword,
                role 
            });

            await user.save();

            const token = jwt.sign(
                { userId: user._id, role: user.role }, 
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            const userResponse = user.toObject();
            delete userResponse.password;

            return { user: userResponse, token };
        } catch (error) {
            throw error; 
        }
    },

    login: async (email, password) => {
        try {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                const error = new Error('User not found');
                error.code = 404;
                throw error;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const error = new Error('Invalid credentials');
                error.code = 401;
                throw error;
            }

            const token = jwt.sign(
                { userId: user._id, role: user.role }, // Include role in token payload
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            const userResponse = user.toObject();
            delete userResponse.password;

            return { user: userResponse, token };
        } catch (error) {
            throw error;
        }
    }
};

module.exports = { authService };
