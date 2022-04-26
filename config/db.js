const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost/NodeAuth";

mongoose.connect(MONGODB_URI);
mongoose.connection
  .on("open", () => {
    console.log("Connected to DataBase");
  })
  .once("error", () => {
    console.log("Failed to connect to DataBase");
  });

module.exports = mongoose;
