const express=require('express');
const Post=require("../model/post")


module.exports.create=function(req,res){
      Post.create({
        content:req.body.content,
        user:req.user._id,
    },function(err,post){

        if(err){
            console.log("error in  creating post");
            return
        }
        console.log("everything is good");
        return res.redirect("back");



    })




}