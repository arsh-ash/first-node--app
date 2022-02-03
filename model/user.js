const mongoose = require("mongoose");
const path=require("path");
const multer=require("multer");
const bcrypt=require("bcryptjs");
//string is converted into path using path module
const AVATAR_PATH=path.join("/upload/users/avatar");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  friends:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Friends"

    },
  ],
  resetToken:{
    type:String,
  },
  expireTime:{
    type:Date,
  },
  avatar:{
    type:String,
  }
},{
    timestamps:true
});


userSchema.pre("save", async function (next) {
  //   if (!this.isModified("password")) {
  //     next();
  //   } // we`ve done it to prevent it from running when we run forgot password API
    const salt = await bcrypt.genSalt(10); // 10 is basically number of rounds for security as you guessed more the better but heavier on the system and 10 is recommended
    this.password = await bcrypt.hash(this.password, salt);
  });
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // this is the method which is gonna be called on actual user so it has access to the password
  };



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,"..",AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

userSchema.statics.uploadedAvatar=multer({storage:storage}).single("avatar");
userSchema.statics.avatarPath=AVATAR_PATH;


const User=mongoose.model("User",userSchema);

module.exports=User;

