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
        console.log("user",user);
        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to to be set in cookie 
passport.serializeUser(function(user,done){
    console.log("serial user",user)
    done(null,user._id);

})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        console.log("deserial user",user)

        if(err){
            console.log("error in finding the user")
            return done(err);
        }
        return done(null,user);
        
    })
})

//check if the user is authenticated



passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
      console.log("arsh");
        return next();
    }

    return res.redirect("/users/signin")

}
passport.setAuthenticatedUser=function(req,res,next){
  console
    if(req.isAuthenticated()){
         res.locals.user=req.user
    }
    next();


}


module.exports=passport