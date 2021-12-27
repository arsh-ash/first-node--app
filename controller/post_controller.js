const express = require("express");
const Post = require("../model/post");
const Comments=require("../model/comments")
const { post } = require("../routes");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in  creating post");
        return;
      }
      console.log("everything is good");
      return res.redirect("back");
    }
  );
};

module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){

        if(post){
            if(post.user==req.user.id){
                post.remove();
                console.log("deleting post")


                Comments.deleteMany({post:req.params.id},function(err){
                    console.log(req.params);
                    // return res.redirect("back");
                })


            }
            return res.redirect("back");
        }
        else{
            console.log("not deleting");
            return res.redirect("back");

        }

    })



}