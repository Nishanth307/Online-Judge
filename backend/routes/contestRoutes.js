const express = require("express")

const contestRouter = express.Router();

contestRouter.get("/", getContests);
contestRouter.get("/:id", getContestById);
contestRouter.post("/create", createContest);
contestRouter.put("/update", updateContest);
contestRouter.delete("/delete", deleteContest)

module.exports = contestRouter;