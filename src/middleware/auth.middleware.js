const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new ApiError(401, 'No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(new ApiError(401, 'Invalid token'));
    }
};



module.exports = auth;