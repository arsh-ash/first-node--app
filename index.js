const express=require("express");
const app=express();
const cookieParser= require("cookie-parser");
port=8000;
//use express router
const router=require("./routes");
app.set('view engine', 'ejs');
app.set("views","./views");
const expressLayouts=require("express-ejs-layouts");
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);
app.set("layout extractStyles",true);
const db=require("./config/mongoose");



//middleware home page chlte is router ki index file m cla jaega
app.use("/",router);



app.listen(port,function(err){
    if(err){
        console.log("error in running server");
        return;
    }
    return console.log(`server is running on port ${port}`);
})