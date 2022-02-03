const express=require("express");
const router=express.Router();
const fs=require("fs");
const path=require("path");
const homeController=require("../controller/home_controller")

console.log("router is running");
// console.log(fs);
// console.log(__dirname);
// console.log(path.join(__dirname,"."));


router.get("/",homeController.home);
router.use("/users",require("./users"));
router.use("/friends",require("./friends"));
router.use("/post",require("./post"));
router.use("/comments",require("./comments"));
router.use("friends",require("./friends"));
router.use("/api",require("./api"));






module.exports=router;