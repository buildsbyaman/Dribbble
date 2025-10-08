const User = require("../models/user.js");
const Shot = require("../models/shot.js");

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
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedUsername || !trimmedEmail || !password) {
      req.flash("failure", "All fields are required.");
      return res.redirect("/user/signup");
    }

    // Additional validation beyond Joi schema
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      req.flash("failure", "Username must be between 3 and 20 characters.");
      return res.redirect("/user/signup");
    }

    if (password.length < 6) {
      req.flash("failure", "Password must be at least 6 characters long.");
      return res.redirect("/user/signup");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      req.flash("failure", "Please enter a valid email address.");
      return res.redirect("/user/signup");
    }

    const newUser = new User({
      username: trimmedUsername,
      email: trimmedEmail,
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
        res.redirect("/shot");
      }
    });
  } catch (error) {
    req.flash("failure", error.message);
    res.redirect("/user/signup");
  }
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/shot");
};

module.exports.profileShow = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format to prevent injection
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      req.flash("failure", "Invalid user ID format!");
      return res.redirect("/shot");
    }
    
    const profileOwner = await User.findById(id);

    if (!profileOwner) {
      req.flash("failure", "User not found!");
      return res.redirect("/shot");
    }

    const userShots = await Shot.find({ author: id })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    if (!res.locals.currUser || res.locals.currUser._id.toString() !== profileOwner._id.toString()) {
      profileOwner.email = null;
      profileOwner.totalContributions = null;
    }

    const userHearts = profileOwner.shotsHearted || [];
    const userLikes = profileOwner.shotsLiked || [];

    res.render("users/show.ejs", {
      cssFiles: [
        "/css/common.css",
        "/css/header.css",
        "/css/footer.css",
        "/css/user-profile.css",
      ],
      profileOwner,
      userShots,
      userHearts,
      userLikes,
    });
  } catch (error) {
    req.flash("failure", error.message);
    res.redirect("/shot");
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
    
    // Input validation and sanitization
    if (!username || !email) {
      req.flash("failure", "Username and email are required.");
      return res.redirect("/user/edit");
    }
    
    const newUsername = username.trim().toLowerCase();
    const newEmail = email.trim().toLowerCase();
    
    // Validate username format
    if (newUsername.length < 3 || newUsername.length > 20) {
      req.flash("failure", "Username must be between 3 and 20 characters.");
      return res.redirect("/user/edit");
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      req.flash("failure", "Please enter a valid email address.");
      return res.redirect("/user/edit");
    }
    if (newUsername !== req.user.username) {
      const existingUser = await User.findOne({ 
        username: newUsername,
        _id: { $ne: req.user._id } // Exclude current user
      });
      if (existingUser) {
        req.flash("failure", "Username is already taken.");
        return res.redirect("/user/edit");
      }
    }

    if (newEmail !== req.user.email) {
      const existingEmail = await User.findOne({ 
        email: newEmail,
        _id: { $ne: req.user._id } // Exclude current user
      });
      if (existingEmail) {
        req.flash("failure", "Email is already registered.");
        return res.redirect("/user/edit");
      }
    }

    const updateData = { username: newUsername, email: newEmail };
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
      res.redirect("/shot");
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
      res.redirect("/shot");
    } else {
      req.flash("success", "Logged out successfully!");
      res.redirect("/shot");
    }
  });
};
