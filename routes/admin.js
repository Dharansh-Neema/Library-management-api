const express = require("express");
const routers = express.Router();
const { addBook } = require("../controllers/admin");

//To Add book
routers.route("/admin/book/add").post(addBook);
module.exports = routers;
