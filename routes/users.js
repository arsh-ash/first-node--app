const express=require("express");
const router=express.Router();
const userController=require("../controller/users_controller")
console.log("user router");

router.get("/post",function(req,res){
    res.send("<h1>Boommm post</h1>")
})
router.get("/profile",userController.profile);



module.exports=router;