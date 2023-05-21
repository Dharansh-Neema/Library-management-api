const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the user is required"],
    maxLength: [250, "Max length of name is 250 charcters"],
  },
  email: {
    type: String,
    required: [true, "E-mail of the user is required"],
    validate: [validator.isEmail, "Please enter valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    minLength: [6, "Password should be of minimum length 6 "],
  },
  contact: {
    type: Number,
    required: [true, "Contact of the person is required"],
    unique: true,
  },
  image: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  issuedBook: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  },
  forgotPasswordExpiry: String,
  forgotPasswordToken: String,
});
userSchema.pre("save", async function (next) {
  //If the password is not being modified we don't encrypt it again
  if (!this.isModified("password")) return next();
  //Strenthing the password by 10 rounds of salt

  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("user", userSchema);
