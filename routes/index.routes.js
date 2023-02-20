const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/sofa", require("./sofa.routes"));
router.use("/user", require("./user.routes"));
router.use("/bookmark", require("./bookmark.routes"));


module.exports = router;
