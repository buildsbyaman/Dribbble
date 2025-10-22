const Review = require("../models/review");
const Shot = require("../models/shot");

module.exports.new = async (req, res) => {
  const shotId = req.params.id;

  if (!shotId.match(/^[0-9a-fA-F]{24}$/)) {
    req.flash("failure", "Invalid shot ID!");
    return res.redirect("/shot");
  }

  try {
    const { rating, comment } = req.body.review;
    const shot = await Shot.findById(shotId);

    if (!shot) {
      req.flash("failure", "Shot not found!");
      return res.redirect("/shot");
    }

    const owner = res.locals.currUser;
    const review = new Review({
      comment,
      rating: parseInt(rating),
      owner,
    });

    await review.save();
    shot.reviews.push(review._id);
    await shot.save();

    req.flash("success", "Successfully added review!");
    res.redirect(`/shot/${shotId}`);
  } catch (error) {
    req.flash("failure", "Error occurred while posting the review!");
    res.redirect(`/shot/${shotId || ""}`);
  }
};

module.exports.delete = async (req, res) => {
  const shotId = req.params.id;
  const reviewId = req.params.reviewId;

  if (
    !shotId.match(/^[0-9a-fA-F]{24}$/) ||
    !reviewId.match(/^[0-9a-fA-F]{24}$/)
  ) {
    req.flash("failure", "Invalid ID format!");
    return res.redirect("/shot");
  }

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      req.flash("failure", "Review not found!");
      return res.redirect(`/shot/${shotId}`);
    }

    const currUser = res.locals.currUser;
    const reviewOwner = review.owner;

    if (currUser._id.toString() === reviewOwner._id.toString()) {
      await Shot.findByIdAndUpdate(shotId, {
        $pull: { reviews: reviewId },
      });
      await Review.findByIdAndDelete(reviewId);
      req.flash("success", "Successfully deleted the review!");
      res.redirect(`/shot/${shotId}`);
    } else {
      req.flash("failure", "You don't own this review!");
      res.redirect(`/shot/${shotId}`);
    }
  } catch (error) {
    req.flash("failure", "Error occurred while deleting the review!");
    res.redirect(`/shot/${shotId || ""}`);
  }
};
