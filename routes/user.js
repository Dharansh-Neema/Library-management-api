const express = require("express");
const routers = express.Router();
const { testUser, signup, login, allBooks } = require("../controllers/user");

routers.route("/test/user").get(testUser);
routers.route("/signup").post(signup);
routers.route("/login").post(login);
routers.route("/allBooks").get(allBooks);
module.exports = routers;
