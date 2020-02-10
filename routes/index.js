var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");

//models
const User = require("../models/users");

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", function(req, res) {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then(hash => {
    const user = new User({
      username, // username == username demek
      password: hash
    });
    const promise = user.save();
    promise
      .then(data => {
        if (!data) next({ errormessage: "Kayıt Bulunamadı" });

        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });
});

module.exports = router;
