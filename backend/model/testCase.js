const mongoose = require("mongoose")

const testCaseSchema = mongoose.Schema({
    "problemId": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "problem",
    },
    "inputPath": {
        type: String,
        required: true,
    },
    "outputPath": {
        type: String,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: true
    },
}, {timestamps: true});

module.exports = mongoose.model("TestCase", testCaseSchema);