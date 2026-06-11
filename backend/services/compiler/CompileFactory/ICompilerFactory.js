const PythonRunner = require("../runners/PythonRunner");
const CppRunner = require("../runners/CppRunner");
const JavaRunner = require("../runners/JavaRunner");
const JavaScriptRunner = require("../runners/JavaScriptRunner");

class ICompilerFactory {
    async execute(filePath, input) {
        throw new Error("Must implement execute");
    }
}



module.exports = CompilerFactory;