const express=require("express");
const router=express.Router();
const userController=require("../controller/users_controller")
console.log("user router");

// router.get("/post",function(req,res){
//     res.send("<h1>Boommm post</h1>")
// })
router.get("/profile",userController.profile);
router.get("/signin",userController.signIn);
router.get("/signup",userController.signUp);
router.post("/create",userController.create);
router.post("/create-session",userController.createSession);




module.exports=router;