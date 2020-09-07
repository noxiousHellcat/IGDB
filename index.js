const express = require("express")
const session = require("express-session")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const app = express()

const urlencoder = bodyparser.urlencoded({
    extended:false
})

app.set("view engine", "hbs")

app.use(session({
    secret: "im batman",
    resave: false,
    saveUninitialized:true,
    cookie: {
        maxAge:1000*60*60*24*30,
        httpOnly: false
    }
}))

app.use(express.static(__dirname + '/public'));

// app.get("/", (req,res)=>{
//     if(req.session.views){
//         req.session.views++
//     }else{
//         req.session.views = 1
//     }
//     req.send("Views: " + req.session.views)
// })

app.get("/", (req,res)=>{
    res.render("home.hbs", {})
})

app.post("/login", urlencoder, (req,res)=>{
    if(res.body.username==="admin" && res.body.password==="1234"){
        res.send("Logged in successfully")
    }else{
        res.send("Invalid login details")
    }
})

app.post("/register", (req,res)=>{
    res.send("Register")
})

app.post("/forgotpassword", (req,res)=>{
    res.send("Forgot Password")
})


app.listen(3000, function(){
    console.log("Listening to port 3000")
})