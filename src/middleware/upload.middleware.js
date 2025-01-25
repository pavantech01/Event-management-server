// const multer = require('multer');
// const { ApiError } = require('../utils/apiError');

// const storage = multer.memoryStorage();

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 10 * 1024 * 1024 // 10MB limit
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new ApiError(400, 'Only image files are allowed'));
//         }
//     }
// });

// module.exports = upload;

const multer = require('multer');
const { ApiError } = require('../utils/apiError');

const storage = multer.memoryStorage(); // Use memory storage for buffer

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new ApiError(400, 'Only image files are allowed'), false);
        }
    }
});

module.exports = upload;