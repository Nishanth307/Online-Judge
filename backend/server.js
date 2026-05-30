const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const DBConnection = require("./database/mongo_connection/db");
const authRoutes = require("./routes/authRoutes");

// Load environment variables from the root folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// Establish database connection
DBConnection();

// Configure CORS to allow secure HttpOnly cookies across origins
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// Zero-dependency cookie-parsing middleware to support HttpOnly cookies without extra npm packages
app.use((req, res, next) => {
    const rawCookies = req.headers.cookie || "";
    req.cookies = {};
    rawCookies.split(";").forEach(cookie => {
        const parts = cookie.split("=");
        if (parts.length === 2) {
            req.cookies[parts[0].trim()] = parts[1].trim();
        }
    });
    next();
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = process.env.BACKEND_PORT || process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});