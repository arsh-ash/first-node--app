const user=require("../model/user");
module.exports.profile=function(req,res){
    res.render("profile");
}



module.exports.signIn=function(req,res){
    res.render("user-signin");;
}


module.exports.signUp=function(req,res){
    res.render("user-signup");;
}

// module.exports.createUser=funxtion(req,res){

// }

