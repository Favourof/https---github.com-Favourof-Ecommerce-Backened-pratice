require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./src/router/user");
const blogRoute = require("./src/router/blog")
const productRoute = require("./src/router/product")
const cartRoute = require("./src/router/cart")
const ImageUploadRoute = require("./src/router/imageUPload");
// console.log("hcjajvcibdsabvksadvkbsakvca");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(blogRoute);
app.use( productRoute);
app.use(cartRoute)
app.use("/api/v1", ImageUploadRoute)
const mongoApiConnet = process.env.mongoURL;

let port = 4001;

const start = async () => {
  try {
    const conn = await mongoose.connect(mongoApiConnet);
    console.log("conneted to db");
    if (conn) {
      app.listen(port, () => {
        console.log("listening on port" + port);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

start();
