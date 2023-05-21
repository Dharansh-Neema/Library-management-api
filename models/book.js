const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the Book is required"],
  },
  author: {
    type: String,
    required: [true, "Name of the author is required"],
  },
  stock: Number,
  issueDate: Date,
  returnDate: Date,
  user_id: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
});
module.exports = mongoose.model("book", bookSchema);
