let Post=require("../../../model/post")
let Comment=require("../../../model/comments");
module.exports.allPosts= async function(req,res){
    try {
        let posts= await Post.find({})
        .populate("user")
        .populate("comments")
        .populate({
          path: "comments",
          populate: {
            path: "user",
          },
        })
    
            return res.status(200).json({
            message:"all post are here",
            posts:posts
        })
        
        
      } catch (error) {
        console.log(error)
        
      }


    }
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post!"
            });
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}




  
    
    // return res.json(200, {
    //     message: "List of posts all posts are here",
        
    // })


