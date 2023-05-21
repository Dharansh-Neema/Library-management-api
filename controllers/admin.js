const Book = require("../models/book");
const User = require("../models/user");

exports.addBook = async (req, res, next) => {
  try {
    const { name, author, stock } = req.body;
    const user = req.user;
    if (user.role != "admin") {
      throw new Error("Only Admin can add Books to lib");
    }
    if (!name || !author) {
      throw new Error("Name and the author of book is required");
    }
    const result = await Book.create({ name, author, stock });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error Occurred", success: false, error });
  }
};
