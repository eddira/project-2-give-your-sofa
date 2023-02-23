const router = require("express").Router();
const Sofa = require("../models/Sofa.model");
const Bookmark = require("../models/Bookmark.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/", async (req, res, next) => {
  try {
    const allSofas = await Sofa.find();
    const userBookmarks = await Bookmark.find({
      user: req.session.currentUser._id,
    });
    const bookmarkedSofaIds = userBookmarks.map((bookmark) =>
      bookmark.sofa.toString()
    );

    allSofas.forEach((sofa) => {
      if (bookmarkedSofaIds.includes(sofa.id)) {
        sofa.isBookmarked = true;
      }
      return sofa;
    });

    res.render("sofa/allSofas", { allSofas, title: "All Sofas" });
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

router.get("/bookmarked", async (req, res, next) => {
  try {
    const bookmarkedSofas = await Bookmark.find({
      user: req.session.currentUser._id,
    }).populate("sofa");

    const allSofas = bookmarkedSofas.map((bookmark) => {
      bookmark.sofa.isBookmarked = true;
      return bookmark.sofa;
    });

    res.render("sofa/allSofas", { allSofas, title: "Bookmaked Sofas" });
  } catch (error) {
    next(error);
  }
});

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

router.post("/:sofaId/bookmark/add", async (req, res, next) => {
  try {
    const foundSofa = await Sofa.findById(req.params.sofaId);
    if (foundSofa) {
      await Bookmark.findOneAndUpdate(
        {
          user: req.session.currentUser._id,
          sofa: foundSofa._id,
        },
        {},
        { upsert: true }
      );
    }

    res.redirect("/sofas/bookmarked");
  } catch (error) {
    next(error);
  }
});

router.post("/:sofaId/bookmark/remove", async (req, res, next) => {
  try {
    await Bookmark.findOneAndDelete({
      user: req.session.currentUser._id,
      sofa: req.params.sofaId,
    });

    res.redirect("/sofas/bookmarked");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
