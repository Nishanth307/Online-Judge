const express = require("express");
const cors = require("cors");
const settings = require("./config/settings");
const DBConnection = require("./config/db");
const userRoute = require("./routes/userRoute");

// Load environment variables from the root folder


const app = express();

// Establish database connection
DBConnection();


// Configure CORS to allow secure HttpOnly cookies across origins
app.use(cors({
    origin: settings.BASE_URL,
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "online judge is running",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});
app.use("/api/users", userRoute);

app.listen(settings.BACKEND_PORT, () => {
    console.log(`${settings.APP_NAME} server is running on port ${settings.BACKEND_PORT}`);
});