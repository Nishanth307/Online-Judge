const PythonRunner = require("../runners/PythonRunner");
const CppRunner = require("../runners/CppRunner");
const JavaRunner = require("../runners/JavaRunner");
const JavaScriptRunner = require("../runners/JavaScriptRunner");

class CompilerFactory {
    createRunner() {
        throw new Error("Implement createRunner");
    }
}

module.exports = CompilerFactory;