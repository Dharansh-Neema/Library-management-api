const express = require("express");
const routers = express.Router();
const { testUser, signup, login } = require("../controllers/user");

routers.route("/test/user").get(testUser);
routers.route("/signup").post(signup);
routers.route("/login").post(login);
module.exports = routers;
