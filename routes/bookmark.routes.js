const router = require("express").Router();
const Sofa = require("../models/Sofa.model");
const Bookmark = require("../models/Bookmark.model");
const User = require("../models/User.model");

router.get("/:sofaId/add", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/:sofaId/delete", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
