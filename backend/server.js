const express = require("express");
const cors = require("cors");
const settings = require("./config/settings");
const DBConnection = require("./config/db");
const userRoute = require("./routes/userRoutes");
const problemRoute = require("./routes/problemRoutes");
const contestRoute = require("./routes/contestRoutes");
const submissionRoute = require("./routes/submissionRoutes");
const testCaseRoute = require("./routes/testCaseRoutes");
const compilerRoute = require("./routes/compilerRoutes");
const errorHandler = require("./middleware/errorHandler");
const { connectProducer } = require("./services/kafka/producer");

const app = express();

app.use(cors({
    origin: settings.BASE_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "online judge is running",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});
app.use("/api/user", userRoute);
app.use("/api/problem", problemRoute);
app.use("/api/contest", contestRoute);
app.use("/api/submission", submissionRoute);
app.use("/api/testCase", testCaseRoute);
app.use("/api/compiler", compilerRoute);

app.use(errorHandler);

const startServer = async () => {
    try {
        //mongo db connection
        await DBConnection();
        // kafka producer connection
        await connectProducer();

        console.log("MongoDB Connected");
        console.log("Kafka Producer Connected");

        //express server start
        app.listen(settings.BACKEND_PORT, () => {
            console.log(`${settings.APP_NAME} server is running on port ${settings.BACKEND_PORT}`);
        });
    } catch (err) {
        console.log("Failed to start:", err);
        process.exit(1);
    }
}

startServer();
