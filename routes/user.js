const express = require("express");
const router = express.Router();
const CustomError = require("../utilities/CustomError.js");
const passport = require("passport");
const { userSchema } = require("../model.js");
const { isLoggedIn, isNotLoggedIn } = require("../middleware.js");
const userController = require("../controllers/user.js");

const validateUserSchema = (req, res, next) => {
  const { error } = userSchema.validate(req.body.user);
  if (error) {
    next(new CustomError(400, error.message));
  } else {
    next();
  }
};

router.get("/signup", isNotLoggedIn, userController.signupShow);

router.get("/login", isNotLoggedIn, userController.loginShow);

router.post("/signup", validateUserSchema, userController.signup);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: { type: "failure", message: "Invalid username or password." },
    failureRedirect: "/user/login",
  }),
  userController.login
);

router.get("/", isLoggedIn, userController.profileShow);

router.get("/edit", isLoggedIn, userController.editShow);

router.put("/", isLoggedIn, userController.edit);

router.delete("/", isLoggedIn, userController.delete);

router.get("/logout", isLoggedIn, userController.logout);

module.exports = router;
