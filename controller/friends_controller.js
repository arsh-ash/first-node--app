const User=require("../model/user");
const Friends= require("../model/friendship")

module.exports.addFriends= async function(req,res){
    let user=await User.findById(req.params.id);
    let ifFriends= await Friends.findOne({
        from_user:req.user._id,
        to_user:req.params.id
    })

    if(ifFriends){
        console.log("already Friends");
        return res.redirect("back");
    }
    else{
        console.log("not friend will make friends now");
        return res.redirect("back");

    }
  
    // console.log("requested user=",req.params.id);


    return res.redirect("back");


}