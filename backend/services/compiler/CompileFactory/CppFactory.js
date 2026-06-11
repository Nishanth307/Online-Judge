const CppRunner = require("../runners/CppRunner");
const ICompilerFactory = require("./ICompilerFactory");

class CppCompilerFactory extends ICompilerFactory {
    async execute(filePath, input) {
        // return new CppRunner().execute(filePath, input);
        // cpp exceution
    }
}

module.exports = CppCompilerFactory;