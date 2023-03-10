const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { isHome: true });
});
router.use("/", require("./auth.routes"));

router.use("/", isAuthenticated);
router.use("/sofas", require("./sofa.routes"));
router.use("/bookmarks", require("./bookmark.routes"));
router.use("/", require("./user.routes"));
// router.use("/", log, require("./test.routes"));

function log(req, res, next) {
  console.log("Entering test routes!");
  next();
}

module.exports = router;
