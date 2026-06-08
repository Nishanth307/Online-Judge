const mongoose = require("mongoose")
const settings = require("./settings");

 /**
 * Establishes connection to MongoDB database
 * Uses mongoose to connect with proper error handling
 */

const DBConnection = async () => {
    try{
        await mongoose.connect(settings.MONGODB_URI, {
            dbName: settings.APP_NAME
        });
        console.log("Successfully connected to MongoDB");
    } catch (err){
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    }
}

module.exports = DBConnection;