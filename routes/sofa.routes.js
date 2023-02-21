const router = require("express").Router();
const Sofa = require("../models/Sofa.model");
const Bookmark = require("../models/Bookmark.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  try {
    res.render("sofa/allSofas");
  } catch (error) {
    next(error);
  }
});

router.get("/bookmarked", (req, res, next) => {
  try {
    res.render("sofa/bookmarkedSofas");
  } catch (error) {
    next(error);
  }
});

router.get("/mine", (req, res, next) => {
  try {
    res.render("sofa/mySofas");
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res, next) => {
  try {
    res.render("sofa/addSofa");
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
        picture_url: req.file?.path, // Only sends the path if there is a new file provided
      });

      await Sofa.create({
        title,
        description,
        owner: req.session.currentUser._id,
        picture_url: req.file?.path, // Only sends the path if there is a new file provided
      });
      res.redirect("/sofas");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:sofaId", (req, res, next) => {
  try {
    res.render("sofa/oneSofa");
  } catch (error) {
    next(error);
  }
});

router.get("/:sofaId/edit", (req, res, next) => {
  try {
    res.render("sofa/editSofa");
  } catch (error) {
    next(error);
  }
});

router.post("/:sofaId/edit", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/:sofaId/delete", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
