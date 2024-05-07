const express = require("express");
const route = express.Router();
const multerUploads = require("../utils/multerUpload");
const {
  addNewBlog,
  getAllProduct,
  getSingleProduct,
  deleteProduntById,
  updateProduct
} = require("../controller/product");

route.post("/addnewproduct", multerUploads.single("image"), addNewBlog);
route.get("/getsingleproduct/:id", getSingleProduct);
route.get("/getallproduct", getAllProduct);
route.delete("/deletewithId/:id", deleteProduntById);
route.patch('/updateproduct/:id', updateProduct)
module.exports = route;
