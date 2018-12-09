const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User");

//register user
router.post("/register", (req, res) => {
  //check if email already exist, if not create new user
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //errors.email = "Email already exists";
      return res.status(400).json("Email already exists");
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.toLowerCase(),
        password: req.body.password.toLowerCase()
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//login user
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //check if user exists
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json("User not found");
    }
    //compares validation between login password and database password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          email: user.email,
          password: user.password
        };
        jwt.sign(
          payload,
          keys.secretKey,
          { expiresIn: "24h" },
          (err, token) => {
            res.json({ success: true, token: "Bearer" + token });
          }
        );
      } else {
        return res.status(400).json("Password incorrect");
      }
    });
  });
});

module.exports = router;
