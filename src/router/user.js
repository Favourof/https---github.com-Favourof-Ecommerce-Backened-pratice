const express = require("express");
const { CraeteUser, getAllUser } = require("../controller/user");
const route = express.Router();

route.post("/createNewUser", CraeteUser);
route.get("/getAllUser", getAllUser);

module.exports = route;
