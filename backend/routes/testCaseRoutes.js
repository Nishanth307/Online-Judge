const express = require ("express");
const TestCase = require("../model/testCase");
const asyncHandler = require("../middleware/asyncHandler");
const { createTestCase, getTestCasesByProblemId } = require("../controller/testCaseController");
const upload = require("../middleware/upload");
const { uploadTestCase } = require("../controller/uploadController");

const testCaseRouter = express.Router();

testCaseRouter.post("/", asyncHandler(createTestCase));
testCaseRouter.get("/problem/:problemId",asyncHandler(getTestCasesByProblemId));
testCaseRouter.post("/upload/:problemId", upload.fields([{ name: "inputFile", maxCount: 1 }, { name: "outputFile", maxCount: 1 }]), uploadTestCase);


module.exports = testCaseRouter;

