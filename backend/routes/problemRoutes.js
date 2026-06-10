const express = require("express")
const { getProblems, getProblemById, createProblem, updateProblem, deleteProblem } = require("../controller/problemController");
const asyncHandler = require("../middleware/asyncHandler");

const problemRouter = express.Router();

problemRouter.get("/", asyncHandler(getProblems));
problemRouter.get("/:id", asyncHandler(getProblemById));
problemRouter.post("/create", asyncHandler(createProblem));
problemRouter.put("/update/:id", asyncHandler(updateProblem));
problemRouter.delete("/delete/:id", asyncHandler(deleteProblem));

module.exports = problemRouter;