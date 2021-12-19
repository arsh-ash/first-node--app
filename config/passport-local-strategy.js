const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
passport.use(
    new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding user");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("user  not found or invalid password");
          return done(null, false);
        }
        // console.log("user",user);
        console.log("main passport function")

        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to to be set in cookie 
passport.serializeUser(function(user,done){
  // console.log("serializer chal kr user ko cookie mein set krra h");
    // console.log("serial user",user)
    done(null,user._id);

})

passport.deserializeUser(function(id,done){
  console.log("deserializer chla h cookie se user uthaega")
    User.findById(id,function(err,user){
        //  console.log("deserial user",user)

        if(err){
            console.log("error in finding the user")
            return done(err);
        }
        return done(null,user);
        
    })
})

//check if the user is authenticated



passport.checkAuthentication=function(req,res,next){
// console.log("bhai m b chal rha hu mera nam checkAuthentication h")
    if(req.isAuthenticated()){
      console.log("arsh");
        return next();
    }

    return res.redirect("/users/signin")

}
passport.setAuthenticatedUser=function(req,res,next){
  // console.log("bhai bhai bhai mera nam hai setAuthenticated user m ab chla hu");
    if(req.isAuthenticated()){
         res.locals.user=req.user
    }
    next();


}


module.exports=passport