const express = require('express');

const router = express.Router();
const passport=require("passport");

const postApiController=require("../../../controller/api/v1/post_api");

router.get("/",postApiController.allPosts);

 router.delete("/:id",
 passport.authenticate("jwt",{session:false}),
 postApiController.destroy)

module.exports=router;



