const User = require("../models/user.js");
const Post = require("../models/post.js");

module.exports.signupShow = (req, res) => {
  res.render("users/signup.ejs", {
    cssFiles: [
      "/css/common.css",
      "/css/header.css",
      "/css/footer.css",
      "/css/auth.css",
    ],
  });
};

module.exports.loginShow = (req, res) => {
  res.render("users/login.ejs", {
    cssFiles: [
      "/css/common.css",
      "/css/header.css",
      "/css/footer.css",
      "/css/auth.css",
    ],
  });
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body.user;
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedEmail || !password) {
      req.flash("failure", "All fields are required.");
      return res.redirect("/user/signup");
    }

    const newUser = new User({
      username: trimmedUsername,
      email: trimmedEmail.toLowerCase(),
    });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (error) => {
      if (error) {
        req.flash(
          "failure",
          "Unable to authenticate you. Please login manually!"
        );
        return res.redirect("/user/signup");
      } else {
        req.flash("success", "Welcome to Dribbble!");
        res.redirect("/post");
      }
    });
  } catch (error) {
    req.flash("failure", error.message);
    res.redirect("/user/signup");
  }
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/post");
};

module.exports.profileShow = async (req, res) => {
  try {
    const userPosts = await Post.find({ author: req.user._id })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    const userHearts = req.user.postsHearted || [];
    const userLikes = req.user.postsLiked || [];

    res.render("users/show.ejs", {
      cssFiles: [
        "/css/common.css",
        "/css/header.css",
        "/css/footer.css",
        "/css/user-profile.css",
      ],
      userPosts,
      userHearts,
      userLikes,
    });
  } catch (error) {
    req.flash("failure", "Unable to load user page.");
    res.redirect("/post");
  }
};

module.exports.editShow = async (req, res) => {
  res.render("users/edit.ejs", {
    cssFiles: [
      "/css/common.css",
      "/css/header.css",
      "/css/footer.css",
      "/css/auth.css",
    ],
  });
};

module.exports.edit = async (req, res) => {
  try {
    const { username, email, age } = req.body.user;
    if (username !== req.user.username) {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        req.flash("failure", "Username is already taken.");
        return res.redirect("/user/edit");
      }
    }

    if (email !== req.user.email) {
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        req.flash("failure", "Email is already registered.");
        return res.redirect("/user/edit");
      }
    }

    const updateData = { username, email };
    if (age && age.trim() !== "") {
      const parsedAge = parseInt(age);
      if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 150) {
        req.flash("failure", "Please enter a valid age (1-150).");
        return res.redirect("/user/edit");
      }
      updateData.age = parsedAge;
    }

    await User.findByIdAndUpdate(req.user._id, updateData);
    req.flash("success", "User updated successfully!");
    res.redirect("/user");
  } catch (error) {
    req.flash("failure", "Unable to update user.");
    res.redirect("/user/edit");
  }
};

module.exports.delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    req.logout((error) => {
      if (error) {
        console.error("Logout error after deletion:", error);
      }
      req.flash("success", "Your account has been successfully deleted.");
      res.redirect("/post");
    });
  } catch (error) {
    req.flash("failure", "Unable to delete account. Please try again.");
    res.redirect("/user/edit");
  }
};

module.exports.logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      req.flash("failure", "Unable to Logout!");
      res.redirect("/post");
    } else {
      req.flash("success", "Logged out successfully!");
      res.redirect("/post");
    }
  });
};
