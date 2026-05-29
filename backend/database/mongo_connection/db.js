const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();
 /**
 * Establishes connection to MongoDB database
 * Uses mongoose to connect with proper error handling
 */

const DBConnection = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error("Error: MONGO_URI environment variable is not set");
        process.exit(1);
    }
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB");
    } catch (err){
        console.error("Error connecting to MongoDB",err);
        process.exit(1);
    }
}

module.exports = DBConnection;