const fs = require("fs/promises");

const cleanupFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.error(`failed to delete: ${filePath}`, error);
        }
    }
};

module.exports = cleanupFile;