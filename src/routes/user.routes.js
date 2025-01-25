const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.post('/profile-picture', auth, upload.single('image'), userController.uploadProfilePicture);

module.exports = router; 