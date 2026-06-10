const Problem = require("../model/problem");

const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        return res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            problems: problems
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problem: problem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createProblem = async (req, res) => {
    try {
        const problem = await Problem.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Problem created successfully",
            problem: problem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findByIdAndDelete(id);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
            problem: problem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findByIdAndUpdate(id, req.body, { new: true });
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem: problem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getProblems, getProblemById, createProblem, deleteProblem, updateProblem };