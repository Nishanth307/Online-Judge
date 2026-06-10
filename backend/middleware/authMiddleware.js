const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }
        const decodedToken = jwt.verify(token, settings.JWT_SECRET);
        req.userId = decodedToken._id;
        next();
    }
    catch (error) {
        res.status(401).send({
            success: false,
            message: "Unauthorized"
        })
    }
}

module.exports = authMiddleware;