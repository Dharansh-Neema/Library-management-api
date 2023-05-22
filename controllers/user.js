const User = require("../models/user");
const Book = require("../models/book");
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
    res.status(401).json({ message: "Error Occurred", success: false, error });
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
    console.log(error);
    res.status(401).json({ message: "Error Occurred", success: false, error });
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
    res.status(401).json({ message: "Error Occurred", success: false, error });
  }
};

//Show all Books
exports.allBooks = async (req, res, next) => {
  try {
    const book = await Book.find();
    const bookName = [];
    // const authorName = [];
    book.forEach((i) => {
      bookName.push(i.name);
      // authorName.push(i.author);
    });

    res.status(200).json({ bookName });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.issueBook = async (req, res, next) => {
  try {
    const { bookName } = req.body;
    const book = await Book.findOne({ name: bookName });
    if (!book) {
      throw new Error("Book isn't available,Please enter Valid Book name");
    }
    if (book.stock <= 0) {
      res
        .status(401)
        .json({ message: "Book isn't available in the stock", stock: 0 });
    }
    //Derving the user who requested for issuing the Book
    const user = await User.findById(req.user._id.valueOf());
    console.log(book, user);
    user.issuedBook.id = book.id;
    book.stock = book.stock - 1;
    //Setting the issue date
    book.issueDate = new Date(Date.now());
    //Setting the return date, 7 days from now
    book.returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    //Saving the user so that we know who have issued it.
    book.user_id.id = user._id;
    //Saving the changes to dataBase
    book
      .save()
      .then(() => {
        console.log("Successfully saved to db");
      })
      .catch((e) => console.log("Error occured before saving to DB", e));
    res.status(200).json({
      success: true,
      message: "Book has been issued succesfully",
      book,
    });
  } catch (error) {
    console.log("Error Occured while issuing the book", error);
  }
};
