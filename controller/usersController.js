const userModel = require("../model/userModel");
const { validateUsers } = require("../utils/Validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    //Validate User
    const { error } = validateUsers(req.body);
    if (error) {
      res.status(409).json({
        status: "Failed to Validate user",
        message: error.details[0].message,
      });
    } else {
      //Verify User
      const oldUser = await userModel.findOne({ email: req.body.email });
      if (oldUser) {
        res.json(`User Already Exist`);
      } else {
        //Salt The Password
        const saltedPassword = await bcrypt.genSalt(10);
        //Hash the Password
        const hashedPasword = await bcrypt.hash(
          req.body.password,
          saltedPassword
        );

        //Create user Object
        const userData = {
          fullName: req.body.fullName,
          course: req.body.course,
          duration: req.body.duration,
          username: req.body.username,
          email: req.body.email,
          password: hashedPasword,
        };

        //Create User
        const user = await userModel.create(userData);
        if (!user) {
          res.status(400).json({
            status: 400,
            message: "Failed to Create User",
          });
        } else {
          res.status(201).json({
            status: 201,
            data: user,
          });
        }
      }
    }
    //Catch Other Errors
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length < 1) {
      res.status(404).json({
        status: 404,
        message: "No User in DataBase",
      });
    } else {
      res.status(200).json({
        status: 200,
        totalUsers: users.length,
        data: users,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = { signUp, getAllUsers };
