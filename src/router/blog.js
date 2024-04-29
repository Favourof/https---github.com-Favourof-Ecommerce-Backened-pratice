const express = require("express");
const { createBlog, getAllBlog } = require("../controller/blog");
const route = express.Router()

route.post("/createNewBlog", createBlog)
route.get("/getAllBlog", getAllBlog)
module.exports = route