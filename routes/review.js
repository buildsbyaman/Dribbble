const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const reviewController = require("../controllers/review.js");
const { reviewSchema } = require("../model.js");

const reviewSchemaValidator = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body.review);
  if (error) {
    req.flash("failure", "Please provide valid review details!");
    return res.redirect("/shot");
  }
  next();
};

router.post("/:id", isLoggedIn, reviewSchemaValidator, reviewController.new);

router.delete("/:id/:reviewId", isLoggedIn, reviewController.delete);

module.exports = router;
