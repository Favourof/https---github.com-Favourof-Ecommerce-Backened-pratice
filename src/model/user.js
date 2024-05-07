const mongoose = require("mongoose");

const validateEmail = function (email) {
  var re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2,6})?)$/i;
  return re.test(email);
};

const UserShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Usert", UserShema);
