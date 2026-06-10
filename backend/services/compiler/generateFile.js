const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const LANGUAGE_EXTENSION_MAP = {
    python: "py",
    cpp: "cpp",
    java: "java",
    javascript: "js"
};

const CODE_DIR = path.join(process.cwd(), "codes");


const generateFile = async (language, code) => {
    const extension = LANGUAGE_EXTENSION_MAP[language];
    if (!extension) {
        throw new Error(`unsupported language: ${language}`);
    }

    await fs.mkdir(CODE_DIR, { recursive: true });

    const fileName = `${randomUUID()}.${extension}`;
    const filePath = path.join(CODE_DIR, fileName);

    await fs.writeFile(filePath, code);
    return filePath;
};

module.exports = generateFile;