const CppRunner = require("../runners/CppRunner");
const ICompilerFactory = require("./ICompilerFactory");

class CppCompilerFactory extends ICompilerFactory {
    async execute(filePath, input) {
        return CppRunner.execute(filePath, input);
    }
}

module.exports = CppCompilerFactory;