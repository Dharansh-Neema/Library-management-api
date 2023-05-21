const Book = require("../models/book");
const User = require("../models/user");

exports.addBook = async (req, res, next) => {
  const { name, author, stock } = req.body;
  if (!name || !author) {
    throw new Error("Name and the author of book is required");
  }
  const result = await Book.create({ name, author, stock });
  res.status(200).json({ result });
};
