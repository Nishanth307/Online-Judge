const express = require("express")

const problemRouter = express.Router();

problemRouter.get("/", getProblems);
problemRouter.get("/:id", getProblemById);
problemRouter.post("/create", createProblem);
problemRouter.put("/update", updateProblem);
problemRouter.delete("/delete", deleteProblem);

module.exports = problemRouter;