const Post = require("../model/post");
const User = require("../model/user");

// module.exports.home = function (req, res) {
//   // console.log(req.cookies);
//   // Post.find({},function(err,posts){
//   //     if(err){
//   //         // console.log("error in finding post",err);
//   //         return;
//   //     }
//   //     // console.log("hii",posts)
//   //     return res.render("home",{
//   //         posts:posts,
//   //     });

//   // })

//   Post.find({})
//     .populate("user")
//     .populate("comments")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     })

//     .exec(function (err, posts) {
//       if (err) {
//         return console.log("error in findind post");
//       }
//       User.find({}, function (err, user) {
//         return res.render("home", {
//           posts: posts,
//           all_users: user,
//         });
//       });
//     });
// };

module.exports.home= async function(req,res){
  console.log(req.user);
  try {
    let posts= await Post.find({})
    .populate("user")
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    }).populate("likes");

    let users= await User.find({});


    return res.render("home",{
      posts:posts,
      all_users:users

    })
    
  } catch (error) {
    console.log(error)
    
  }
  

}