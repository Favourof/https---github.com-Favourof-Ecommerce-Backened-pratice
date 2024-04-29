const Product = require("../model/product");
const cloudinary = require("../utils/cloudinary-setup");

async function addNewBlog(req, res) {
  const { title, description, price, category } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SQIImage",
    });
    console.log(result, "result");

    const response = await Product.create({
      title,
      description,
      price,
      category,
      image: result.secure_url,
      publicId: result.public_id
    });
    if (!response) {
      return res.status(400).json({ message: "error creating product" });
    }
    res.status(201).json({ message: "product created succeess", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "there is an error", error });
  }
}
async function getSingleProduct(req, res) {
  try {
    const id = req.params.id;
    const response = await Product.findById(id);
    console.log(response);
    res.json({ response, total: response.length }).status(201);
  } catch (error) {
    console.log(error);
  }
}
async function getAllProduct(req, res) {
  try {
    //   const id = req.params.id;
    const response = await Product.find();
    console.log(response);
    res.json({ response, total: response.length }).status(201);
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduntById(req, res) {
  try {
    const id = req.params.id;
    const response = await Product.findByIdAndDelete(id);
    console.log(response);
    res.json({ response, total: response.length }).status(201);
  } catch (error) {
    console.log(error)
    console.log(res.json({message: "error you"}));
  }
}

module.exports = {
  addNewBlog,
  getAllProduct,
  getSingleProduct,
  deleteProduntById,
};
