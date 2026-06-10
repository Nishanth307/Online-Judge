const express = require("express")
const { registerUser, loginUser, logoutUser } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/user");

const router = express.Router();


router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        res.send({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router