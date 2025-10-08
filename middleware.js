module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("failure", "Please Login before proceeding!");
    res.redirect("/user/login");
  }
};

module.exports.isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("success", "Already LoggedIn!");
    res.redirect("/shot");
  } else {
    next();
  }
};
