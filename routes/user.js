const express = require("express");
const routers = express.Router();
const { testUser } = require("../controllers/user");

routers.route("/test/user").get(testUser);
module.exports = routers;
