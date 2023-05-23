const Book = require("../models/book");
const User = require("../models/user");
//Basic CRUD regarding book
//adding the books to library,(only admin can do it)
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
    res
      .status(200)
      .json({ success: true, message: "Book Added to Library", result });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error Occurred", success: false, error });
  }
};
//updating the books to library,(only admin can do it)

exports.updateBook = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role != "admin") {
      throw new Error("Only Admin can Update Books to lib");
    }
    const id = req.body.id;
    if (!id) {
      return new Error("Please provide the Book id");
    }
    let book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      throw new Error("The book doesn't exist anymore");
    }
    const newBookInfo = await Book.findById(id);
    res.status(201).json({
      success: true,
      message: "Info Updated",
      newBookInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something went wrong while updating the Book info in DB",
    });
  }
};

//Deleting the books to library,(only admin can do it)

exports.deleteBook = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      throw new Error("Only Admin can Delete Books to lib");
    }
    const id = req.body.id;
    if (!id) return new Error("Please provide the Book id");
    let book = await Book.findByIdAndDelete(id);
    if (!book) {
      throw new Error("Not able to find the book in the Library");
    }
    res.status(201).json({
      success: true,
      message: "The Book has been deleted from the LIBRARY",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Something went wrong while Deleting book from Library",
    });
  }
};

//To see all user and their Info
exports.seeAllUser = async (req, res, next) => {
  try {
    if (req.user.role != "admin")
      throw new Error("Admin accessible route only");
    let { id, name } = req.user;
    id = id.valueOf();
    const user = await User.find();
    res.status(200).json({
      success: true,
      adminId: id,
      message: `Hello ${name}, here is the required information`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
