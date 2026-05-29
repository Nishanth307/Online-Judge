const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AuthUser = require("../models/authUser");

const getUser = async(email) => { 
    const user = await AuthUser.findOne({email: email.toLowerCase()})
    if (user) {
        return {success:true,user}
    }
    return {success:false,message:"User not found"}
}

const hashPassword = async(password) => {
    saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
 
const validatePassword = async(password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}

const validateToken = async(token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
 
// Generate JWT token
const generateToken = async(payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: "24h"}
    )
}

const generateRefreshToken = async() => {

}

module.exports = {
    getUser,
    hashPassword,
    validatePassword,
    validateToken,
    generateToken,
    generateRefreshToken
}