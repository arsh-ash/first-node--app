const express=require("express");
const app=express();
const cookieParser= require("cookie-parser");
port=9000;
//use express router
// const router=require("./routes");
app.set('view engine', 'ejs');
app.set("views","./views");
const expressLayouts=require("express-ejs-layouts");

const MongoStore=require("connect-mongo");


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);
app.set("layout extractStyles",true);
const db=require("./config/mongoose");




//used for session cookie
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");






app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/contact_list_db',
        autoRemove:'disabled',
    },function(err){
        console.log(err || 'connect-mongdb setup');
    })
   
}));

console.log("we are ging to use passport")
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//middleware home page chlte is router ki index file m cla jaega
app.use("/",require("./routes"));


app.listen(port,function(err){
    if(err){
        console.log("error in running server");
        return;
    }
    return console.log(`server is running on port ${port}`);
})