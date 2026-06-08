// Validate required environment variables

/*
APP_NAME=online_judge
NODE_ENV=development

BASE_URL = "http://localhost:5000"
BACKEND_PORT = 5000

MONGODB_URI=mongodb://localhost:27017/${APP_NAME}

JWT_SECRET=secret 
REFRESH_TOKEN_LIMIT_DAYS=7
ACCESS_TOKEN_LIMIT_HOURS=12


KAFKA_BROKER=localhost:9092

REDIS_HOST=localhost
REDIS_PORT=6379

MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=password123
MINIO_BUCKET=submissions
*/
const requiredEnvVars = [
    "APP_NAME",
    "BASE_URL",
    "BACKEND_PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "REFRESH_TOKEN_LIMIT_DAYS",
    "ACCESS_TOKEN_LIMIT_HOURS",
    // "KAFKA_BROKER",
    // "REDIS_HOST",
    // "REDIS_PORT",
    // "MINIO_ENDPOINT",
    // "MINIO_PORT",
    // "MINIO_ACCESS_KEY",
    // "MINIO_SECRET_KEY",
    // "MINIO_BUCKET",
];

path.resolve(__dirname, ".env")

for (const key of requiredEnvVars) {
    if (!process.env[key]) {
        throw new Error(`${key} is not defined`);
    }
}

// Build settings object
const settings = {
    APP_NAME: process.env.APP_NAME,
    MONGODB_URI: process.env.MONGODB_URI,
    BACKEND_PORT: process.env.BACKEND_PORT,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    REFRESH_TOKEN_LIMIT_DAYS: process.env.REFRESH_TOKEN_LIMIT_DAYS,
    ACCESS_TOKEN_LIMIT_HOURS: process.env.ACCESS_TOKEN_LIMIT_HOURS,
    KAFKA_BROKER: process.env.KAFKA_BROKER,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    MINIO_PORT: process.env.MINIO_PORT,
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
    MINIO_BUCKET: process.env.MINIO_BUCKET,
};

export default settings;

module.exports = settings
