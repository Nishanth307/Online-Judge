const PythonCompilerFactory = require("./PythonFatcory");
const CppCompilerFactory = require("./CppFactory");
const ICompilerFactory = require("./ICompilerFactory");

class CompilerFactoryProvider {
    static getFactory(language) {
        const factories = {
            python: new PythonCompilerFactory(),
            cpp: new CppCompilerFactory(),
        }

        const factory = factories[language];
        if (!factory) { 
            throw new Error(`unsupported language: ${language}`);
        }
        return factory;
    }
}

module.exports = CompilerFactoryProvider;