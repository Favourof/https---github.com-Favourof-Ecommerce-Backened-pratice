const express = require("express");
const {
  handleSignUp,
  handleLogIn,
  handleCheckAuth,
} = require("../controller/auth");
const { verifyToken } = require("../middleWare/verifyToken");
const route = express.Router();

route.post("/signupuser",  handleSignUp);
route.post("/loginuser", handleLogIn);
route.post("/checkauth", verifyToken, handleCheckAuth);

module.exports = route;
