const AuthUser = require("..models/authUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthUtil = require("../utils/authUtil");

 /**
 * Register a new user
 * @route POST /register
 */

const registerUser = async (req, res) => {
    try {
        //get payload validate and store in mongo
        const {firstName, lastName, email, password} = req.body;

        if(!(firstName && lastName && email && password)){
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        // existing user check
        userData = await AuthUtil.getUser(email);
        if (userData.success){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hashed Password
        hashedPassword = AuthUtil.hashPassword(password);

        // create new user
        const user = await AuthUser.create({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // generate tokens 
        const accessToken = AuthUtil.generateToken({
            _id: user.id,
            email: user.email
        })

        // store refresh token in redis 
        const refreshToken = AuthUtil.generateRefreshToken({
            _id: user.id,
            email: user.email
        })

        const userResponse = {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
        }

        // set http only cookie 
        res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user: userResponse,
            token: accessToken
        })
        // send back response
    } 

    catch(error){
        console.error("Registration error", error);
        if (error.name == 'ValidationError'){
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationErrors
            });
        }else if (error.code === 11000){
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            }); 
        } else{
            res.status(500).json({
                success: false,
                message: "Internal Server error during registration"
            });
        }
    }

 }; 

 const loginUser = async (req,res) => {
    try {

    }
    catch(error){
        console.log("login error",error);
        res.status(500).json({
            success: false,
            message: "Internal server error during login"
        });
    }
 };

 const logoutUser = async (req,res) => {
    try {

    }
    catch(error){
        console.log("logout error",error);
        res.status(500).json({
            success: false,
            message: "Internal server error during logout"
        });
    }
 };

 module.exports = {registerUser, loginUser, logoutUser};
