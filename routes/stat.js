const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");
const statController = require("../controllers/stat.js");

router.post("/hearts", isLoggedIn, statController.hearts);

router.post("/likes", isLoggedIn, statController.likes);

module.exports = router;
