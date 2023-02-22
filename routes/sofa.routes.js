const router = require("express").Router();
const Sofa = require("../models/Sofa.model");
const Bookmark = require("../models/Bookmark.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/", async (req, res, next) => {
  try {
    const allSofas = await Sofa.find()
    res.render("sofa/allSofas" , {allSofas});
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
        picture: req.file?.path, // Only sends the path if there is a new file provided
      });

      await Sofa.create({
        title,
        description,
        owner: req.session.currentUser._id,
        picture: req.file?.path, // Only sends the path if there is a new file provided
      });
      res.redirect("/sofas");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:sofaId", async (req, res, next) => {
  try {
    const oneSofa = await Movie.findById(req.params.sofaId);
    res.render("sofa/sofaDetails", { oneSofa });
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

router.post("/:sofaId/edit", async (req, res, next) => {
  try {
    const { title, description, picture, owner } = req.body;

    await Sofa.findByIdAndUpdate(req.params.sofaId, {
      title,
      description,
      picture,
      owner,
    });
    res.redirect("/sofa");
  } catch (error) {
    next(error);
  }
});

router.post("/:sofaId/delete", async (req, res, next) => {
  try {
    await Sofa.findByIdAndDelete(req.params.sofaId);
    res.redirect("/sofa");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
