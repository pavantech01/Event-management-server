// const checkAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Access denied. Admins only.' });
// };

// module.exports = { checkAdmin };
const jwt = require('jsonwebtoken');

const role = {
    checkAdmin: (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET_KEY');
            
            // Add the decoded user to req.user
            req.user = decoded;

            if (decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};

module.exports = role;


