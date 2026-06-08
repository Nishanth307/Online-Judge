const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }
        const decodedToken = jwt.verify(token, settings.JWT_SECRET);
        req.userId = decodedToken.userId;
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