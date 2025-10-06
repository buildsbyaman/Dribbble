const express = require("express");
const { isLoggedIn } = require("../middleware");
const { postSchema } = require("../model.js");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const statRouter = require("./stat.js");
const postController = require("../controllers/post.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Dribbble",
  },
});

const postSchemaValidatorForNew = (req, res, next) => {
  const { error } = postSchema.validate(req.body.post);
  if (error) {
    req.flash("failure", error.message);
    res.redirect("/post/new");
  } else {
    next();
  }
};

const postSchemaValidatorForUpdate = (req, res, next) => {
  const { error } = postSchema.validate(req.body.post);
  if (error) {
    req.flash("failure", error.message);
    res.redirect("/post/new");
  } else {
    next();
  }
};

const upload = multer({ storage: storage });

router.get("/", postController.indexShow);

router.get("/new", isLoggedIn, postController.newShow);

router.get("/:id", postController.individualShow);

router.post(
  "/",
  isLoggedIn,
  upload.single("post[image]"),
  postSchemaValidatorForNew,
  postController.new
);

router.get("/:id/edit", isLoggedIn, postController.editShow);

router.put(
  "/:id",
  isLoggedIn,
  upload.single("post[image]"),
  postSchemaValidatorForUpdate,
  postController.edit
);

router.use("/:id/stat", statRouter);

router.delete("/:id", isLoggedIn, postController.delete);

module.exports = router;
