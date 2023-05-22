const express = require("express");
const routers = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const {
  testUser,
  signup,
  login,
  allBooks,
  issueBook,
} = require("../controllers/user");

routers.route("/test/user").get(testUser);
routers.route("/signup").post(signup);
routers.route("/login").post(login);
routers.route("/allBooks").get(allBooks);
routers.route("/issue").post(isLoggedIn, issueBook);
module.exports = routers;
