const express = require("express");
const { createCart, getAllCart } = require("../controller/cart");
const route = express.Router()

route.post("/cart", createCart)
route.get("/cart-product", getAllCart)
module.exports = route