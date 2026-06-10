const { exec } = require("child_process");
const path = require("path");
const fs = require("fs/promises");
const CompilerRunner = require("./compilerInterface");

class CppRunner extends CompilerRunner {
    async execute(filePath, input) {
        //compile
        // run excecutable
    }
}

module.exports = new CppRunner();