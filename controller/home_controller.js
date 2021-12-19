const Post=require("../model/post")

module.exports.home=function(req,res){
    // console.log(req.cookies);
    Post.find({},function(err,posts){
        if(err){
            // console.log("error in finding post",err);
            return;
        }
        // console.log("hii",posts)
        return res.render("home",{
            posts:posts,
        });

    })
  
}