const hapiJoi = require("@hapi/joi");

const validateUsers = (data) => {
  const usersValidate = hapiJoi.object({
    fullName: hapiJoi.string(),
    course: hapiJoi.string(),
    duration: hapiJoi.string(),
    username: hapiJoi.string(),
    email: hapiJoi.string().email(),
    password: hapiJoi.string().min(6).max(25),
  });
  return usersValidate.validate(data);
};

module.exports.validateUsers = validateUsers;

const validateNews = (data) => {
  const newsValidate = hapiJoi.object({
    title: hapiJoi.string().max(25),
    description: hapiJoi.string(),
  });
  return newsValidate.validate(data);
};

module.exports.validateNews = validateNews;
