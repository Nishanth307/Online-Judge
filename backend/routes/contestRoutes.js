const express = require("express")
const { getContests, getContestById, createContest, updateContest, deleteContest } = require("../controller/contestController");
const asyncHandler = require("../middleware/asyncHandler");

const contestRouter = express.Router();

contestRouter.get("/", asyncHandler(getContests));
contestRouter.get("/:id", asyncHandler(getContestById));
contestRouter.post("/create", asyncHandler(createContest));
contestRouter.put("/update/:id", asyncHandler(updateContest));
contestRouter.delete("/delete/:id", asyncHandler(deleteContest));

module.exports = contestRouter;