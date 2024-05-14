const User = require("../model/auth");
const Otpmodel = require("../model/otp");
const { UserZodSchema } = require("../utils/ZodSchema");
const { sendWelcomeEmail, sendVerificationCode } = require("../mailer/mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
async function handleSignUp(req, res) {
  let { firstName, lastName, email, gender, phone, password } = req.body;
  try {
    let validatedData = UserZodSchema.parse({
      firstName,
      lastName,
      email,
      gender,
      phone,
      password,
    });
    const salt = await bcrypt.genSalt();

    validatedData.password = await bcrypt.hash(password, salt);
    // make my validation validation

    const response = await User.create(validatedData);
    const name = firstName + " " + lastName;
    // await sendWelcomeEmail({ name, email });
    res.status(200).json(validatedData);
    console.log(validatedData);

    handleSendOtpVerification({ email });
  } catch (error) {
    res.status(500).json({ error: "error creating data", error });
    console.log(error);
  }
}

async function handleLogIn(req, res) {
  const { email, password } = req.body;
  // checking if user input eamil or password
  try {
    if (!email || !password) {
      return res.status(404).json({ message: "please fill all details" });
    }

    //  checking and fectching user data in the data base

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "invalid login Credentail" });
    }

    //  checking if the password is correct
    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      return res.status(404).json({ message: "invalid login Credentail" });
    }

    //  creating a token for login user with jwt
    const token = createToken(userDetails._id, userDetails.email);

    res.json({ message: "u are logged in", token });
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error creating data", error });
  }
}

const handleCheckAuth = async (req, res) => {
  console.log("hello");
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
};

const handleSendOtpVerification = async ({ res, email }) => {
  try {
    console.log(email);
    let otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const salt = await bcrypt.genSalt();
    let otps = await bcrypt.hash(otp, salt);
    const response = await Otpmodel.create({
      email,
      createdAt: Date.now(),
      expiresAt: Date.now(),
      otps,
    });
    await sendVerificationCode({ email, otp });
    // res.json(response);
    console.log(response);
  } catch (error) {
    // res.json({ message: "error ggg", error });
    console.log(error);
  }
};
module.exports = { handleSignUp, handleLogIn, handleCheckAuth };

//      JWT  -> JSON -> WEB -> TOKEN
