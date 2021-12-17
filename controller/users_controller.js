const { response } = require("express");
const { findOne } = require("../model/user");
const User = require("../model/user");
// const user=require("../model/user");
module.exports.profile = function (req, res) {
     return res.render("profile");
  
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
};

module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect("/users/profile")
  }
  
 return res.render("user-signin");
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
module.exports.destroySession = function(req, res){
  req.logout();

  return res.redirect('/');
}


