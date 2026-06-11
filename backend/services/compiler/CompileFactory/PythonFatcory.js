const PythonRunner = require("../runners/PythonRunner");
const CompilerFactory = require("./ICompilerFactory");

class PythonFactory extends CompilerFactory {
    execute() {
        return new PythonRunner();
    }
}

module.exports = new PythonFactory();