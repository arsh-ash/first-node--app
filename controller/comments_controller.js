const express=require('express');
const Comments=require("../model/comments")
const Post=require("../model/post")
const commentsMailer=require("../mailers/comments_mailer");

module.exports.create= async function(req,res){
    // console.log("hiii", req.user);
    try {
        let post= await Post.findById(req.body.post)
        if(post){
          let comment = await Comments.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post,

            })
            post.comments.push(comment);
            post.save();
            comment=await comment.populate("user");
            console.log("user of this comment is",comment.user.email);
            commentsMailer.newComment(comment);
            res.redirect('/');

        }
    } catch (error) {
        console.log(error);
        
    }

    // Post.findById(req.body.post,function(err,post){
    //     if(post){
    //         Comments.create({
    //             content:req.body.content,
    //             user:req.user._id,
    //             post:req.body.post,

    //         },function(err,comment){
    //             if(err){
    //                 return console.log("error in ceating comment")
    //             }
    //             post.comments.push(comment);
    //             post.save();
    //             // comment = comment.populate('user', 'name email').execPopulate();
    //             // commentsMailer.newComment(comment);



    //             res.redirect('/');
    //         })

    //     }

    // })

}

module.exports.destroy=function(req,res){
    Comments.findById(req.params.id,function(err,comment){
        console.log(comment);
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
               
            })
            return res.redirect("back");


        }
       
        res.redirect("back");


    })
}

