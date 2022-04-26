const express = require("express");
const router = express.Router();
const {
  getAllNews,
  getOneNews,
  postNews,
  editNews,
  deleteNews,
} = require("../controller/newsController");

router.route("/view").get(getAllNews).post(postNews);

router
  .route("/view/update/:id")
  .get(getOneNews)
  .patch(editNews)
  .delete(deleteNews);

module.exports = router;
