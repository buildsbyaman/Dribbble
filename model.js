const joi = require("joi");

module.exports.userSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
