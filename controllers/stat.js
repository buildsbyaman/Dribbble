const Post = require("../models/post.js");
const User = require("../models/user.js");

module.exports.hearts = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    const user = await User.findById(res.locals.currUser._id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasHearted = user.postsHearted.includes(id);

    if (hasHearted) {
      post.hearts = Math.max(0, post.hearts - 1);
      user.postsHearted.pull(id);
    } else {
      post.hearts += 1;
      user.postsHearted.push(id);
    }

    await Promise.all([post.save(), user.save()]);
    res.json({ hearts: post.hearts, isHearted: !hasHearted });
  } catch (error) {
    res.status(500).json({ error: "Failed to update hearts" });
  }
};

module.exports.likes = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    const user = await User.findById(res.locals.currUser._id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasLiked = user.postsLiked.includes(id);

    if (hasLiked) {
      post.likes = Math.max(0, post.likes - 1);
      user.postsLiked.pull(id);
    } else {
      post.likes += 1;
      user.postsLiked.push(id);
    }

    await Promise.all([post.save(), user.save()]);
    res.json({ likes: post.likes, isLiked: !hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to update likes" });
  }
};
