const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/sofas", require("./sofa.routes"));
// router.use("/user", require("./user.routes"));
router.use("/bookmarks", require("./bookmark.routes"));

module.exports = router;
