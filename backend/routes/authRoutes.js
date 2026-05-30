const express = require("express")
const { registerUser, loginUser, logoutUser } = require("../controller/authController");

const router = express.Router();

router.get("/", (req, res)=>{
    res.status(200).json({
        message: "online judge is running",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router