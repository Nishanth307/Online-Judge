const Problem = require("../model/problem");
const TestCase = require("../model/testCase");
const AppError = require("../utils/AppError");

const createTestCase = async (req, res) => {
    try {
        const { problemId, inputPath, outputPath, isHidden } = req.body;
        const problem = await Problem.findById(problemId);
        if (!problem) {
            throw new AppError("Problem not found", 404);
        }
        const createTestCase = await TestCase.create({
            problemId,
            inputPath,
            outputPath,
            isHidden,
        });

        return res.status(201).json({
            success: true,
            message: "TestCase created successfully",
            testCase: createTestCase
        });
    } catch (error) {
        throw new AppError(error.message, 500);
    }
};

const getTestCasesByProblemId = async (req, res) => {

    const testCases = await TestCase.find({
        problemId: req.params.problemId,
    });

    res.status(200).json({
        success: true,
        count: testCases.length,
        data: testCases,
    });
}

module.exports = { createTestCase, getTestCasesByProblemId };