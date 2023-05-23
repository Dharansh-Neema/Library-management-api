const express = require("express");
const routers = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const { addBook, updateBook, deleteBook } = require("../controllers/admin");

//To Add book
routers.route("/admin/book/add").post(isLoggedIn, addBook);
//To Update Book
routers.route("/admin/book/update").post(isLoggedIn, updateBook);
//To Delete Book
routers.route("/admin/book/delete").post(isLoggedIn, deleteBook);
module.exports = routers;
