const express= require("express");
const router=express.Router()

const friendsController=require("../controller/friends_controller");
router.get("/",friendsController.getFriends)





module.exports=router;