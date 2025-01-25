// user.service.js
const User = require('../models/user.model');
const cloudinary = require('../config/cloudinary.config');

const userService = {
    async getUserProfile(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    async updateUserProfile(userId, updateData) {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    async uploadProfilePicture(userId, file) {
        const result = await cloudinary.uploader.upload(file.path);
        const imageUrl = result.secure_url;
        await User.findByIdAndUpdate(userId, { profilePicture: imageUrl });
        return imageUrl;
    }
};

module.exports = userService;