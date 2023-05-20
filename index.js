//Importing express and configuring app
const express = require("express");
const app = express();

//Importing .env files and configuring it.
require("dotenv").config();

//Importing Database config files
const connectWithDB = require("./config/db");
connectWithDB();

//test route
app.get("/api/test", (req, res) => {
  res.send("Testing lib");
});

//User routes
const userRoute = require("./routes/user");
app.use("/api/", userRoute);
//Declaration of PORT
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
