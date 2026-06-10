const CompilerRunner = require("./compilerInterface");

class JavaRunner extends CompilerRunner {

    async execute(filePath, input) {
        // javac
        // java
    }
}

module.exports = new JavaRunner();