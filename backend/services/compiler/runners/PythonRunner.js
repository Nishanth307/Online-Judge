const { exec } = require("child_process");
const CompilerRunner = require("./compilerInterface");

class PythonRunner extends CompilerRunner {
    async execute(filePath, input = "") {
        return new Promise((resolve, reject) => {
            const child = exec(
                `python3 ${filePath}`,
                { timeout: 2000 },
                (error, stdout, stderr) => {
                    if (error) {
                        return reject(error);
                    }
                    if (stderr) {
                        return reject(stderr);
                    }
                    resolve(stdout);
                }
            );
            child.stdin.write(input);
            child.stdin.end();
        });
    }
}

module.exports = new PythonRunner();