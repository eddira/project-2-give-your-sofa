const router = require("express").Router();
const Sofa = require("../models/Sofa.model");
const Bookmark = require("../models/Bookmark.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/", async (req, res, next) => {
  try {
    const allSofas = await Sofa.find();
    res.render("sofa/allSofas", { allSofas });
  } catch (error) {
    next(error);
  }
});

router.get("/bookmarked", async (req, res, next) => {
  try {
    const bookmarkedSofas = await Sofa.find.populate();
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
    const oneSofa = await Sofa.findById(req.params.sofaId).populate("owner");

    const userIsOwner = oneSofa.owner._id.equals(req.session.currentUser._id);
    res.render("sofa/sofaDetails", { oneSofa, userIsOwner });
  } catch (error) {
    next(error);
  }
});

router.get("/:sofaId/edit", async (req, res, next) => {
  try {
    const oneSofa = await Sofa.findById(req.params.sofaId);
    res.render("sofa/editSofa", { oneSofa });
  } catch (error) {
    next(error);
  }
});

router.post("/:sofaId/edit", async (req, res, next) => {
  try {
    const { sofaId } = req.params;
    const { title, description, picture } = req.body;

    const updatedSofa = await Sofa.findOneAndUpdate(
      {
        _id: sofaId,
        owner: req.session.currentUser._id,
      },
      {
        title,
        description,
        // picture,
      }
    );

    if (updatedSofa) {
      res.redirect(`/sofas/${sofaId}`);
    } else {
      res.redirect("/sofas");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:sofaId/delete", async (req, res, next) => {
  try {
    await Sofa.findOneAndDelete({
      _id: req.params.sofaId,
      owner: req.session.currentUser._id,
    });

    res.redirect("/sofas");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
