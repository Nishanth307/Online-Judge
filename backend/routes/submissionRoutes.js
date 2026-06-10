const express = require("express")
const { getSubmissions, getSubmissionById, createSubmission } = require("../controller/submissionController");
const asyncHandler = require("../middleware/asyncHandler");

const submissionRouter = express.Router();

submissionRouter.get("/", asyncHandler(getSubmissions));
submissionRouter.get("/:id", asyncHandler(getSubmissionById));
submissionRouter.post("/submit", asyncHandler(createSubmission));

module.exports = submissionRouter;  