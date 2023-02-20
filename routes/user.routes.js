const router = require("express").Router();
const isAuthenticated = require("./../middlewares/isAuthenticated");
const isAdmin = require("./../middlewares/isAdmin");
const User = require("./../models/User.model");

router.get("/users", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.render("user/userList", { allUsers });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", isAuthenticated, (req, res, next) => {
  res.render("user/profile");
});

router.post("/profile/delete", async (req, res, next) => {
  try {
    res.render("user/deleteAccount");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
