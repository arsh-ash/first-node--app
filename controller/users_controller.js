const { response } = require("express");
const { findById } = require("../model/user");
const User = require("../model/user");
// const user=require("../model/user");
module.exports.profile = function (req, res) {
  res.render("profile");

// if(res.cookies.user_id){
//     console.log("hiiiiii");
//     findById(res.cookies.user_id,function(err,user){
//         if(user){
//             return res.render("profile");
//         }
//        return res.redirect("/users/signin");
//     })
// }
// else{
//     return res.redirect("/users/signin");
// }
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
    //find user
    User.findOne({
        email:req.body.email
    },function(err,user){
        if(err){
            console.log("error in finding user");
            return;
        }
        //handle user found
        if(user){
            //handle password which doesnot match
            if(user.password!=req.body.password){
                return res.redirect("back");

            }
    
    //handle session creation (cookies)
    res.cookie("user_id",user.id);
    return res.redirect("/users/profile")

        }else{
            return res.redirect("back");

        }
    })


    

    //handle user not found
};
