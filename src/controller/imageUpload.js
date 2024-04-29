const cloudinary = require("../utils/cloudinary-setup");
// 
const handleUploadImage = async (req, res) => {
  // console.log(req.file);
  try {
    const  publicId  = req.params.publicId;

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    res.json({ message: 'Image deleted successfully', result });

  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
};


 async function handleUploadVideo(req, res) {
  console.log(req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {resource_type:"auto"})
    console.log(`result: ${result.secure_url}`);
    res.json(result);
  } catch (error) {
    res.json({meesage: error})
    console.log(error);
  }
 }

module.exports = {
  handleUploadImage,
  handleUploadVideo,
};