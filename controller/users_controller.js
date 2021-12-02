const { response } = require("express");
const User = require("../model/user");
// const user=require("../model/user");
module.exports.profile = function (req, res) {
  res.render("profile");
};

module.exports.signIn = function (req, res) {
  res.render("user-signin");
};

module.exports.signUp = function (req, res) {
  res.render("user-signup");
};

module.exports.create = function (req, res) {
    // console.log("arsh");
  if (req.body.password !== req.body.confirm_password) {
      console.log(req.body.password,req.body.confirm_password);
    return res.redirect("back");
  }
  console.log(req.body.email);
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        console.log("error in finding user in signing up");
        return;
      }
      if (!user) {
        User.create(req.body, function (err, newUser) {
          if (err) {
            console.log("error in findong user in signing up");
            return;
          }
          console.log(newUser);
          return res.redirect("/users/signin");
        });
      }
      else{
          console.log("second");
        return res.redirect("back");

      }
    }
  );
};

module.exports.createSession = function (req, res) {
    

};
