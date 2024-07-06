var express = require("express");
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.json({ title: "Express" });
});

module.exports = indexRouter;
