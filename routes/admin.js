const express = require("express");
const routers = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const { addBook } = require("../controllers/admin");

//To Add book
routers.route("/admin/book/add").post(isLoggedIn, addBook);
module.exports = routers;
