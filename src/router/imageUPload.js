const express = require("express");
const { handleUploadImage, handleUploadVideo } = require("../controller/imageUpload");
const multerUploads = require("../utils/multerUpload")

const route = express.Router();

route.delete("/uploadImage/:publicId",  handleUploadImage);
route.post("/uploadvideo", multerUploads.single("video"), handleUploadVideo);

module.exports = route;