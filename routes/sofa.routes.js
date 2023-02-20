const router = require("express").Router();
const Sofa = require("../models/Sofa.model");
const Bookmark = require("../models/Bookmark.model");
const User = require("../models/User.model");

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

router.post("/create", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

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
