const express=require("express");
const router=express.Router();
const homeController=require("../controller/home_controller")

console.log("router is running");

router.get("/",homeController.home);
router.use("/users",require("./users"));
router.use("/friends",require("./friends"));




module.exports=router;