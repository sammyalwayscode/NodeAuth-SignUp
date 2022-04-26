const newsModel = require("../model/newsModel");
const { validateNews } = require("../utils/Validate");

const getAllNews = async (req, res) => {
  try {
    const getNewsData = await newsModel.find();
    res.status(200).json({
      message: "Data Gotten Sucessfully",
      data: getNewsData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to Get Data",
      data: error.message,
    });
  }
};

const getOneNews = async (req, res) => {
  try {
    const getOneNewsData = await newsModel.findById(req.params.id);
    res.status(200).json({
      message: `Data gotten from: ${req.params.id}`,
      data: getOneNewsData,
    });
  } catch (error) {
    res.status(404).json({
      message: `Failed to get data from: ${req.params.id}`,
      data: error.message,
    });
  }
};

const postNews = async (req, res) => {
  try {
    const { error } = validateNews({
      title: req.body.title,
      description: req.body.description,
    });

    if (error) {
      res.status(409).json({
        status: "Failed to Validate",
        message: error.details[0].message,
      });
    } else {
      const postNewsData = await newsModel.create({
        title: req.body.title,
        description: req.body.description,
      });
      res.status(200).json({
        message: "News Uploaded Sucessfully...",
        data: postNewsData,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Unable to upload News... Please Try Again",
      data: error.message,
    });
  }
};

const editNews = async (req, res) => {
  try {
    const { error } = validateNews({
      title: req.body.title,
      description: req.body.description,
    });

    if (error) {
      res.status(409).json({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    } else {
      const editData = await newsModel.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Updated Sucessfully...",
        data: editData,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "failed to Update!",
      data: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const removeNews = await newsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted Sucessfully",
      data: removeNews,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to Delete Data",
      data: error.message,
    });
  }
};

module.exports = {
  getAllNews,
  getOneNews,
  postNews,
  editNews,
  deleteNews,
};
