const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../model/User");

function CheckUsernames(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  User.findOne({ username: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      next();
    } else {
      res.status(409).json({ error: "Username already taken" });
    }
  });
}

router.post("/login", express.json(), (req, res, next) => {
  User.findOne(
    { username: req.body.email, password: req.body.password },
    (err, user) => {
      if (err) throw err;
      if (user) {
        req.session.user = user._id;
        req.session.save();
        res.send();
      } else {
        res.status(404).send();
      }
    }
  );
});

router.post("/signup", express.json(), CheckUsernames, (req, res, next) => {
  var newUser = new User({
    username: req.body.email,
    password: req.body.password
  });
  newUser.save().then(user => {
    req.session.user = user._id;
    res.json(user);
  });
});

router.get("/signout", (req, res, next) => {
  req.session.user = null;
  req.session.save();
  res.send();
});

router.get("/", (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user, "-_id", (err, user) => {
      if (err) throw err;
      if (user) {
        res.json(user);
      } else {
        res.status(404).json();
      }
    });
  } else {
    res.status(404).json();
  }
});

module.exports = router;
