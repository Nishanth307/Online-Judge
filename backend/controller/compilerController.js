const generateFile = require("../services/compiler/generateFile");
const CompilerFactory = require("../services/compiler/CompileFactory/CompilerFactory");

const compileCode = async (req, res) => {
    try {
        const { language, code, input } = req.body;
        if (!language || !code){
            return res.status(400).json({
                success: false,
                message: "Language and code are required"
            });
        }
        const filePath = await generateFile(language, code);
        const runner = CompilerFactory.getRunner(language);
        const output = await runner.execute(
            filePath,
            input
        );
        return res.status(200).json({
            success: true,
            output
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { compileCode }