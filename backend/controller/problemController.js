// problemRouter.get("/", getProblems);
// problemRouter.get("/:id", getProblemById);
// problemRouter.post("/create", createProblem);
// problemRouter.put("/update", updateProblem);
// problemRouter.delete("/delete", deleteProblem);
const { findByIdAndUpdate } = require("../model/contest");
const Problem = require("../model/problem")

const getProblems = async (req,res)=>{
    const problem = await Problem.find();
    if (!problem) {
        return res.status(404).json({
            success: false,
            message: "Problems fetched successfully",
            data: problems 
        })
    }
}
const getProblemById = async (req,res)=>{
    const {id} = req.params;
    const problem = await Problem.findById(id);
    if (!problem) {
        return res.status(404).json({
            success: false,
            message: "Problems fetched successfully",
            data: problem
        })
    }
    return res.status(200).json({
        success: true,
        message: "Contest fetched successfully",
        contest: contest
    })
}

const createProblem = async (req,res)=>{
    const problem = await Problem.create();
    if (!problem) {
        return res.status(404).json({
            success: false,
            message: "Problems fetched successfully",
            data: problems 
        })
    }
    return res.status(200).json({
        success: true,
        message: "Contest fetched successfully",
        contest: contest
    })
}
const deleteProblem = async (req,res)=>{
    const problem = await Problem.findByIdAndDelete(id);
    if (!problem) {
        return res.status(404).json({
            success: false,
            message: "Problems fetched successfully",
            data: problems 
        })
    }
    return res.status(200).json({
        success: true,
        message: "Contest fetched successfully",
        contest: contest
    })
}
const updateProblem = async (req,res)=>{
    const problem = await Problem.findByIdAndUpdate(id);
    if (!problem) {
        return res.status(404).json({
            success: false,
            message: "Problems fetched successfully",
            data: problems 
        })
    }
    return res.status(200).json({
        success: true,
        message: "Contest fetched successfully",
        contest: contest
    })
}

module.exports = {getProblems, getProblemById, createProblem, deleteProblem, updateProblem}