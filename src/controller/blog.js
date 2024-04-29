const blog = require("../model/blog");


async function createBlog(req, res) {

    const {title, description, author} = req.body;


    try {
        const response = await blog.create({ title, description, author });
        console.log(response);
    
        res.json({ message: "user crated succefully", response }).status(201);
      } catch (error) {
        console.log(error);
      }
    // res.status(200).json({

    //     message: "Blog created successfully"
    // })
}

async function getAllBlog(req, res) {
     try{
        const response = await blog.find();
        res.json({response, total: response.lenght }).status(200);
     } catch(error){
       console.log(error);
     }

    
  
}

module.exports = {createBlog, getAllBlog}