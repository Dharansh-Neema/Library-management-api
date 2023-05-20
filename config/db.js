const mongoose = require("mongoose");
const connectWithDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log(`Error Occurred while connecting to DB ${err}`);
      process.exit(1);
    });
};
module.exports = connectWithDB;
