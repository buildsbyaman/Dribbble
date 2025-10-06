const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  postsLiked: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
  postsHearted: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
  totalContributions: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
