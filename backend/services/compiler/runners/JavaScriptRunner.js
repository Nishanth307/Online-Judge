const { exec } = require("child_process");
const CompilerRunner = require("./compilerInterface");

class JavaScriptRunner extends CompilerRunner {
    async execute(filePath, input) {
        //node
    }
}

module.exports = new JavaScriptRunner();