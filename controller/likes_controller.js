const express=require('express');
const PostLikes=require("../model/postLikes");
const User=require("../model/user");
const Post=require("../model/post");

module.exports.togglePostLikes= async function(req,res){
    console.log("post to be liked=",req.params.id);
    let post=await Post.findById(req.params.id).populate("likes");
    console.log(post);
    let existingLike= await PostLikes.findOne({
        post:req.params.id,
        user:req.user._id

    })
    if(existingLike){
        console.log("like exist");
        post.likes.pull(existingLike._id);
        post.save();
        existingLike.remove();


    }
    else{
        console.log("like did dot exist");
        let newLike= await PostLikes.create({
            user:req.user._id,
            post:req.params.id,

        })
        console.log("new like",newLike);
        post.likes.push(newLike);
        post.save();
        console.log(post);
    }
    
    return res.redirect("back");

}