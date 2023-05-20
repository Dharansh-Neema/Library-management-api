const jwt = require("jsonwebtoken");
const cookieToken = function (user, res) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
  res
    .status(201)
    .cookie("token", token, {
      expire: new Date(Date.now() + 1000 * 60 * 60 * 6),
      httpOnly: true,
    })
    .json({ success: true, user, token });
};
module.exports = cookieToken;
