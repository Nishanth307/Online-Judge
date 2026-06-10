const express = require("express");
const compilerController = require("../controller/compilerController");

const router = express.Router();

router.post("/run",compilerController.compileCode);

module.exports = router;