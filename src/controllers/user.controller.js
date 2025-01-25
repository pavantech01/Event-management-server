const userService = require('../services/user.service');
const catchAsync = require('../utils/catchAsync');

const userController = {
    getProfile: catchAsync(async (req, res) => {
        const user = await userService.getUserProfile(req.user.id);
        res.status(200).json(user);
    }),

    updateProfile: catchAsync(async (req, res) => {
        const updatedUser = await userService.updateUserProfile(req.user.id, req.body);
        res.status(200).json(updatedUser);
    }),

    uploadProfilePicture: catchAsync(async (req, res) => {
        const imageUrl = await userService.uploadProfilePicture(req.user.id, req.file);
        res.status(200).json({ imageUrl });
    })
};

module.exports = { userController };
