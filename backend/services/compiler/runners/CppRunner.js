const { exec } = require("child_process");
const path = require("path");
const fs = require("fs/promises");
const CompilerRunner = require("./compilerInterface");

class CppRunner extends CompilerRunner {
    async execute(filePath, input = "") {
        const dirName = path.dirname(filePath);
        const fileName = path.basename(filePath, ".cpp");
        const outputPath = path.join(dirName, `${fileName}.out`);

        return new Promise((resolve, reject) => {
            exec(`g++ ${filePath} -o ${outputPath}`, (compileError, compileStdout, compileStderr) => {
                if (compileError) {
                    return reject(new Error(compileStderr || compileError.message));
                }

                const child = exec(
                    outputPath,
                    { timeout: 2000 },
                    async (runError, runStdout, runStderr) => {
                        try {
                            await fs.unlink(outputPath);
                        } catch (cleanupErr) {
                            if (cleanupErr.code !== "ENOENT") {
                                console.error(`Failed to clean up binary: ${outputPath}`, cleanupErr);
                            }
                        }

                        if (runError) {
                            return reject(runError);
                        }
                        if (runStderr) {
                            return reject(new Error(runStderr));
                        }
                        resolve(runStdout);
                    }
                );

                if (input) {
                    child.stdin.write(input);
                }
                child.stdin.end();
            });
        });
    }
}

module.exports = new CppRunner();