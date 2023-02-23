const router = require("express").Router();
const Sofa = require("../models/Sofa.model");
const Bookmark = require("../models/Bookmark.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/", async (req, res, next) => {
  try {
    const allBookmarkedSofas = await Bookmark.find();
    res.render("bookmark/allSofas", { allBookmarkedSofas });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  fileUploader.single("picture_url"),
  async (req, res, next) => {
    try {
      const { title, description } = req.body;
      console.log({
        title,
        description,
        owner: req.session.currentUser._id,
        picture: req.file?.path, // Only sends the path if there is a new file provided
      });

      await Bookmark.create({
        title,
        description,
        owner: req.session.currentUser._id,
        //     picture: req.file?.path, // Only sends the path if there is a new file provided
      });
      res.redirect("/bookmarks");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
