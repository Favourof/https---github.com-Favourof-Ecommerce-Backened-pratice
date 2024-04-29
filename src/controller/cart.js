const cart = require("../model/cart");


async function createCart(req, res) {

    try {
        const response = await cart.create(req.body);
        console.log(response);
        if (!response) {
          res.json({message: "error why creating"})
        }
    
        res.json({ message: "Add to cart succefully", response }).status(201);
      } catch (error) {
        console.log(error);
      }
    // res.status(200).json({

    //     message: "Blog created successfully"
    // })
}

async function getAllCart(req, res) {
     try{
        const response = await cart.find();
        res.json({response, total: response.lenght }).status(200);
     } catch(error){
       console.log(error);
     }

    
  
}

module.exports = {createCart, getAllCart}