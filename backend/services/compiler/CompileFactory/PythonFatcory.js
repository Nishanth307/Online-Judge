const PythonRunner = require("../runners/PythonRunner");
const ICompilerFactory = require("./ICompilerFactory");

class PythonFactory extends ICompilerFactory {
    async execute(filePath, input) {
        return PythonRunner.execute(filePath, input);
    }
}

module.exports = PythonFactory;