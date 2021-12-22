const express=require('express');
const Comments=require("../model/comments")
const Post=require("../model/post")

module.exports.create=function(req,res){
    console.log("hiii",);
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comments.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post,

            },function(err,comment){
                if(err){
                    return console.log("error in ceating comment")
                }
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            })

        }

    })

}

