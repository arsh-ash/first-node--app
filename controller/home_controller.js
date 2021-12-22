const Post = require("../model/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // Post.find({},function(err,posts){
  //     if(err){
  //         // console.log("error in finding post",err);
  //         return;
  //     }
  //     // console.log("hii",posts)
  //     return res.render("home",{
  //         posts:posts,
  //     });

  // })

  Post.find(
    {}).populate("user")
    .populate("comments").
    populate({
      path:"comments",
      populate:{
        path:"user",
        
      }
    })
  
    .exec(function (err, posts) {
      if (err) {
        return console.log("error in findind post");
      }
      return res.render("home", {
        posts: posts,
      });
    })
  ;
};
