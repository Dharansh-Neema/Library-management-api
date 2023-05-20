const mongoose = require("mongoose");
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
      unique: true,
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
    info: {
      id: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: String,
});
