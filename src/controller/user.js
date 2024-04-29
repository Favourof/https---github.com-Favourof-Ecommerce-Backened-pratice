// const user = require("../model/user");
const User = require("../model/user");

async function CraeteUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(403).json({ message: "Please fill all the fields" });

  try {
    const response = await User.create({ name, email, password });
    console.log(response);

    res.json({ message: "user crated succefully", response }).status(201);
  } catch (error) {
    console.log(error);
  }
}

async function getAllUser(req, res) {
  try {
    const response = await User.find({});
    res.json({ response, total: response.lenght }).status(200);
  } catch (error) {
    res.json(response).status(500);
  }
}

module.exports = { CraeteUser, getAllUser };
