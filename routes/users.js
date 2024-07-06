const express = require("express");
const User = require("../models/user");
const passport = require("passport");
const authenticate = require("../authenticate");

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

usersRouter.post("/signup", (req, res) => {
  const newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password)
    .then((user) => {
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        passport.authenticate("local", (err, passportUser, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(passportUser);
          }
        })(req, res);
      });
    })
    .then((passportUser) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: true, status: "Registration Successful!" });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
    });
});

usersRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      token: token,
      status: "You are successfully logged in!",
    });
  }
);

usersRouter.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

module.exports = usersRouter;
