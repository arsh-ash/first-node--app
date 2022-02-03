const { response } = require("express");
const { findOne, findById } = require("../model/user");
const fs=require("fs");
const path=require("path");
const User = require("../model/user");
const passwordMailer=require("../mailers/forgerPasswoedMailer")
const crypto=require("crypto");
module.exports.profile = async function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log("error in finding the user", err);
    }
    return res.render("profile", {
      user_profile: user,
    });
  });
};
module.exports.updateProfile = async function (req, res) {
  // console.log("in update",req.params.id);
  // if(req.user.id==req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user){

  // })
  // //lack of callback function in query use async await.
  // return res.redirect("back");

  // }

  // return res.redirect("back");
  if ((req.user.id == req.params.id)) {
    let user = await User.findById(req.params.id);
    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("multerError");
      }
      console.log(req.file);
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.file) {

        if(user.avatar){
          fs.unlinkSync(path.join(__dirname,"..",user.avatar));
        }
        user.avatar = User.avatarPath + "/" + req.file.filename;
      }
      console.log(user.avatar);
      user.save();
      res.redirect("back");
    });
  }
};

// User.findById(req.params.id,function(err,user){
//   console.log("profile",user);

//   if(err){
//     console.log("error in finding uder",err);
//   }
//   if(user){

//     return res.render("profile",{
//       user:user,

//     })
//   }

// })

// console.log(req.cookies.user_id);
// if(req.cookies.user_id){
//        User.findById(req.cookies.user_id,function(err,user){
//            if(user){
//                console.log(user.name);
//                return res.render("profile",{
//                    user:user,
//                })
//            }
//           return res.redirect("/users/signin")

//        })
// }
// else{
//   return res.redirect("/users/signin");
//   // return res.render("user-signin");

// }

//   if(req.cookies.user_id){
//     User.findById(req.cookies.user_id,function(err,user){
//         if(user){
//             return res.render("profile",{
//                 user:user,
//             })

//         }else{
//             return res.redirect("/users/signin")
//         }

//     })
//   }
//  return res.redirect("/users/signin");;

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user-signin");
};

module.exports.signUp = function (req, res) {
  res.render("user-signup");
};

module.exports.create = function (req, res) {
  // console.log("arsh");
  if (req.body.password !== req.body.confirm_password) {
    console.log(req.body.password, req.body.confirm_password);
    return res.redirect("back");
  }
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
      } else {
        console.log("second");
        return res.redirect("back");
      }
    }
  );
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");

  // User.findOne({email:req.body.email},function(err,user){
  //     console.log("boom",user);
  //     if(err){
  //     console.log("error in finding user");
  //     }
  //     if(user){
  //         if(req.body.password==user.password){
  //             console.log("hiiiiii")
  //             res.cookie("user_id",user._id);
  //             return res.redirect("/users/profile");

  //         }
  //             return res.redirect("back");

  //     }else{
  //         return res.redirect("back");

  //     }

  // })
};
module.exports.forgetPassword=function(req,res){

  return res.render("forgetPassword");

}
module.exports.forgetEmail= async function(req,res){
  console.log(req.body);
  let user=await User.findOne({email:req.body.email})
  if (user){
    let buffer= await crypto.randomBytes(32)
    let token=buffer.toString("hex");
    
    user.resetToken=token
    // user.expireTime=Date.now+3600000
    await user.save()
    console.log("boooooom token user",user);



    passwordMailer.passwordLink(user);
  }
  res.redirect("/users/signin");
}
module.exports.resetPassword=function(req,res){
  return res.render("resetPassword",{
    token:req.params.id,
  });
}

module.exports.changingPassword= async function(req,res){
  let id=req.params.id
  console.log("hexa token",id);
  if(req.body.password==req.body.confirmPassword){
    let user= await User.findOne({resetToken:id})
    user.password=req.body.password;
    user.save();
    return res.redirect("/users/signin");
  }
  return res.redirect("back");

}
module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};
