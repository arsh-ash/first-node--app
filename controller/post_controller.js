const express = require("express");
const Post = require("../model/post");
const Comments=require("../model/comments")
const { post } = require("../routes");

module.exports.create = async function (req, res) {
 let post=await Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    }
  );

//   if (req.xhr){
//     return res.status(200).json({
//         data: {
//             post: post
//         },
//         message: "Post created!"
//     });
// }
  res.redirect("back");
  console.log("phirse boom");
};

module.exports.destroy= async function(req,res){
  try {
    let post= await Post.findById(req.params.id)

        if(post){
            if(post.user==req.user.id){
                post.remove();
                console.log("deleting post")


              await  Comments.deleteMany({post:req.params.id})
              return res.redirect("back");
              


            }
        }
        else{
            console.log("not deleting");
            return res.redirect("back");

        }
    
  } catch (error) {
    console.log(error);
    return
    
  }
    

  



}