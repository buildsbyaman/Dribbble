const Shot = require("../models/shot.js");
const User = require("../models/user.js");

module.exports.views = async (req, res) => {
  try {
    const { id } = req.params;

    const shot = await Shot.findById(id);
    
    if (!shot) {
      return res.status(404).json({ error: "Shot not found" });
    }

    // For views, we don't need to track individual users, just increment
    shot.views += 1;
    await shot.save();
    
    res.json({ views: shot.views });
  } catch (error) {
    res.status(500).json({ error: "Failed to update views" });
  }
};

module.exports.likes = async (req, res) => {
  try {
    const { id } = req.params;

    const shot = await Shot.findById(id);
    const user = await User.findById(res.locals.currUser._id);

    if (!shot) {
      return res.status(404).json({ error: "Shot not found" });
    }

    const hasLiked = user.shotsLiked.includes(id);

    if (hasLiked) {
      shot.likes = Math.max(0, shot.likes - 1);
      user.shotsLiked.pull(id);
    } else {
      shot.likes += 1;
      user.shotsLiked.push(id);
    }

    await Promise.all([shot.save(), user.save()]);
    res.json({ likes: shot.likes, isLiked: !hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to update likes" });
  }
};
