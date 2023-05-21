const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt");
//Importing cloudinary
const cloudinary = require("cloudinary").v2;
//test route
exports.testUser = async (req, res, next) => {
  try {
    res.send("Testing user controllers");
  } catch (error) {
    console.log(error);
  }
};
//Sign up route
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, contact } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !contact || !req.files) {
      throw new Error("Name , email , password , contact, Image are required");
    }
    if (req.files) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "userImages",
        }
      );
      const user = await User.create({
        name,
        email,
        password,
        contact,
        image: { id: result.public_id, secure_url: result.secure_url },
      });
      cookieToken(user, res); //creting cookie for user id
    }
  } catch (error) {
    console.log("Some Error occured", error);
  }
};

//Login Route
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or password is required");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Email or password is incorrect ");
    }
    const storedPass = user.password;
    const isCorrect = await bcrypt.compare(password, storedPass);

    if (!isCorrect) {
      throw new Error("Email or password is incorrect ");
    }
    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};
