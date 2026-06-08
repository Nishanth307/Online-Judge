const express = require("express")

const submissionRouter = express.Router();

submissionRouter.get("/", getSubmissions);
submissionRouter.get("/:id", getSubmissionById);
submissionRouter.post("/submit", createSubmission);

module.exports = submissionRouter;