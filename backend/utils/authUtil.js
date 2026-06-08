const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const settings = require("../config/settings");

const getUser = async (email) => {
    const userData = await User.findOne({ email: email.toLowerCase() })
    if (userData) {
        return { success: true, user: userData }
    }
    return { success: false, message: "User not found" }
}

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

const validatePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

const validateToken = async (token) => {
    return jwt.verify(token, settings.JWT_SECRET);
}

// Generate JWT token
const generateToken = async (payload) => {
    return jwt.sign(
        payload,
        settings.JWT_SECRET,
        { expiresIn: "24h" }
    )
}

const generateRefreshToken = async (payload) => {
    return jwt.sign(
        payload,
        settings.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

module.exports = {
    getUser,
    hashPassword,
    validatePassword,
    validateToken,
    generateToken,
    generateRefreshToken
}