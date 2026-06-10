/*
Using memory storage is fine because we'll immediately stream the file to MinIO.
*/

const multer = require("multer");

const storage = multer.memoryStorage();

module.exports = multer({storage}); 