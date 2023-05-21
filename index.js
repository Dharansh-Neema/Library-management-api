//Importing express and configuring app
const express = require("express");
const app = express();

//Importing .env files and configuring it.
require("dotenv").config();

//Importing Database config files
const connectWithDB = require("./config/db");
connectWithDB();

//Importing file and cookie middleware
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { json } = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cloudinary config
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
//test route
app.get("/api/test", (req, res) => {
  res.send("Testing lib");
});

//User routes
const userRoute = require("./routes/user");
app.use("/api/", userRoute);

//Admin routes
const adminRoute = require("./routes/admin");
app.use("/api/", adminRoute);
//Declaration of PORT
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
