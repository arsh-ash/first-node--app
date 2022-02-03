const mongoose=require("mongoose");

const postLikesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
     },
     post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"

      }
      

},{
    timestamps:true,

})

const PostLikes=mongoose.model("PostLikes",postLikesSchema);
module.exports=PostLikes;