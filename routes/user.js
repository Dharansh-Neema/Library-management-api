const express = require("express");
const routers = express.Router();
const { testUser, signup } = require("../controllers/user");

routers.route("/test/user").get(testUser);
routers.route("/signup").post(signup);
module.exports = routers;
