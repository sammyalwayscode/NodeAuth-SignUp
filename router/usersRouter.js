const express = require("express");
const router = express.Router();
const { signUp, getAllUsers } = require("../controller/usersController");

router.route("/user/signup").post(signUp);
router.route("/users").get(getAllUsers);

module.exports = router;
