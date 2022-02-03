const express=require("express");
const router=express.Router();
const userController=require("../controller/users_controller")
const passport=require("passport");
console.log("user router");

// router.get("/post",function(req,res){
//     res.send("<h1>Boommm post</h1>")
// })
router.get("/profile/:id",passport.checkAuthentication,userController.profile);
router.get("/signin",userController.signIn);
router.get("/signup",userController.signUp);
router.post("/create",userController.create);
router.get("/signout",userController.destroySession);
router.get("/forgetpassword",userController.forgetPassword);
router.post("/forgetEmail",userController.forgetEmail);
router.get("/changepassword/:id",userController.resetPassword);
router.post("/changedone/:id",userController.changingPassword);
router.post("/profile/update/:id",passport.checkAuthentication,userController.updateProfile)

// router.post("/create-session",userController.createSession);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
), userController.createSession);




module.exports=router;