const Post = require("../models/post.js");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../utilities/CustomError.js");

const extractPublicId = (url) => {
  const parts = url.split("/");
  const last = parts[parts.length - 1];
  return last.substring(0, last.lastIndexOf("."));
};

module.exports.indexShow = async (req, res, next) => {
  try {
    const postData = await Post.find().populate("author");

    let userLikes = [];
    let userHearts = [];

    if (req.user) {
      const User = require("../models/user.js");
      const user = await User.findById(req.user._id);
      if (user) {
        userLikes = user.postsLiked.map((id) => id.toString());
        userHearts = user.postsHearted.map((id) => id.toString());
      }
    }

    res.render("posts/index.ejs", {
      postData,
      userLikes,
      userHearts,
      cssFiles: [
        "/css/common.css",
        "/css/header.css",
        "/css/footer.css",
        "/css/home.css",
      ],
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    next(new CustomError(500, "Internal server Error"));
  }
};

module.exports.newShow = (req, res) => {
  res.render("posts/new.ejs", {
    cssFiles: [
      "/css/common.css",
      "/css/header.css",
      "/css/footer.css",
      "/css/auth.css",
    ],
  });
};

module.exports.individualShow = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    req.flash("failure", "Invalid post ID format!");
    return res.redirect("/post");
  }

  try {
    const post = await Post.findById(id).populate("author");
    if (!post) {
      req.flash("failure", "No post found with this ID!");
      return res.redirect("/post");
    }

    let isLiked = false;
    let isHearted = false;

    if (req.user) {
      const User = require("../models/user.js");
      const user = await User.findById(req.user._id);
      if (user) {
        isLiked = user.postsLiked.includes(id);
        isHearted = user.postsHearted.includes(id);
      }
    }

    res.render("posts/show.ejs", {
      post,
      isLiked,
      isHearted,
      cssFiles: [
        "/css/common.css",
        "/css/header.css",
        "/css/footer.css",
        "/css/post-detail.css",
      ],
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    req.flash("failure", "Error loading post!");
    res.redirect("/post");
  }
};

module.exports.new = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      req.flash("failure", "Please upload an image for your post.");
      return res.redirect("/post/new");
    }
    const { title, description, tags } = req.body.post;
    const newPost = new Post({
      title,
      description: description,
      image: req.file.path,
      tags: tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
      author: res.locals.currUser.id,
    });
    await newPost.save();
    req.flash("success", "Post created successfully!");
    res.redirect(`/post/${newPost.id}`);
  } catch (error) {
    console.error("Error creating post:", error);
    req.flash("failure", "Unable to create post.");
    res.redirect("/post/new");
  }
};

module.exports.editShow = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    req.flash("failure", "Invalid post ID format!");
    return res.redirect("/post");
  }

  try {
    const post = await Post.findById(id).populate("author");
    if (!post) {
      req.flash("failure", "Post not found!");
      return res.redirect("/post");
    }
    if (res.locals.currUser.id == post.author.id) {
      res.render("posts/edit.ejs", {
        post,
        cssFiles: [
          "/css/common.css",
          "/css/header.css",
          "/css/footer.css",
          "/css/auth.css",
        ],
      });
    } else {
      req.flash("failure", "You don't own this post!");
      res.redirect("/post");
    }
  } catch (error) {
    console.error("Error fetching post for edit:", error);
    req.flash("failure", "Error loading post!");
    res.redirect("/post");
  }
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    req.flash("failure", "Invalid post ID format!");
    return res.redirect("/post");
  }

  try {
    const oldPost = await Post.findById(id);
    if (!oldPost) {
      req.flash("failure", "Post not found!");
      return res.redirect("/post");
    }
    if (res.locals.currUser.id == oldPost.author._id) {
      let image = oldPost.image;
      if (req.file && req.file.path) {
        const publicId = extractPublicId(oldPost.image);
        await cloudinary.uploader.destroy(`Dribbble/${publicId}`);
        image = req.file.path;
      }
      const { title, description, tags } = req.body.post;
      await Post.findByIdAndUpdate(
        id,
        {
          title,
          image,
          description,
          tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        },
        { new: true }
      );
      req.flash("success", "Post updated successfully!");
      res.redirect(`/post/${id}`);
    } else {
      req.flash("failure", "You don't own this post!");
      res.redirect("/post");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    req.flash("failure", "Error updating post!");
    res.redirect("/post");
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    req.flash("failure", "Invalid post ID format!");
    return res.redirect("/post");
  }

  try {
    const oldPost = await Post.findById(id).populate("author");
    if (!oldPost) {
      req.flash("failure", "Post not found!");
      return res.redirect("/post");
    }
    if (res.locals.currUser.id == oldPost.author._id) {
      const publicId = extractPublicId(oldPost.image);
      await cloudinary.uploader.destroy(`Dribbble/${publicId}`);
      await Post.findByIdAndDelete(id);
      req.flash("success", "Post deleted successfully!");
      res.redirect("/post");
    } else {
      req.flash("failure", "You don't own this post!");
      res.redirect("/post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    req.flash("failure", "Error deleting post!");
    res.redirect("/post");
  }
};
