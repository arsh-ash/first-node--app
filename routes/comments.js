const express=require("express");
const router=express.Router();
const commentsController=require("../controller/comments_controller")
const Passport=require("passport"); 
router.post("/create",commentsController.create);
router.get("/destroy/:id",commentsController.destroy);

module.exports=router;