const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const usersModel = mongoose.model("UsersAuth", userSchema);
module.exports = usersModel;
