const asyncHandler = require("../middleware/asyncHandler");
const minioClient = require("../config/minio");
const settings = require("../config/settings");

exports.uploadTestCase = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    const inputFile = req.files.inputFile[0];
    const outputFile = req.files.outputFile[0];

    const timestamp = Date.now();

    const inputPath = `testcases/${problemId}/input_${timestamp}.txt`;
    const outputPath = `testcases/${problemId}/output_${timestamp}.txt`;

    await minioClient.putObject(settings.MINIO_BUCKET, inputPath, inputFile.buffer);
    await minioClient.putObject(settings.MINIO_BUCKET, outputPath, outputFile.buffer);

    const testCase = await TestCase.create({
        problemId,
        inputPath,
        outputPath,
        isHidden: true
    });

    res.status(201).json({
        success: true,
        message: "Test case uploaded successfully",
        data: testCase,
    });
});