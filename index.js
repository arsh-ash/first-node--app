const express=require("express");
const app=express();
port=8000;
//use express router
const router=require("./routes");
app.set('view engine', 'ejs');
app.set("views","./views");


//middleware home page chlte is router ki index file m cla jaega
app.use("/",router);



app.listen(port,function(err){
    if(err){
        console.log("error in running server");
        return;
    }
    return console.log(`server is running on port ${port}`);
})