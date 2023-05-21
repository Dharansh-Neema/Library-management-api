const User = require("../models/user");
const jwt = require("jsonwebtoken");
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.body.token;
    if (!token) {
      throw new Error("Please LogIn First");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedId);
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error Occurred", success: false });
  }
};
module.exports = isLoggedIn;
