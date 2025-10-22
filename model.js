const joi = require("joi");

module.exports.userSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports.shotSchema = joi.object({
  title: joi.string().min(3).max(20).required(),
  description: joi.string().min(10).max(5000).required(),
  tags: joi.string().required().required(),
});
