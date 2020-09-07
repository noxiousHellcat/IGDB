const express = require("express")
const session = require("express-session")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const app = express()

const urlencoder = bodyparser.urlencoded({
    extended:false
})

app.set("view engine", "hbs")

app.use(express.static(__dirname + '/public'));

app.get("/", (req,res)=>{
    res.render("home.hbs", {})
})

app.get("/login", (req,res)=>{
    res.render("login.hbs", {})
})

app.get("/game", (req,res)=>{
    res.render("game.hbs", {})
})

app.get("/playlist", (req,res)=>{
    res.render("playlist.hbs", {})
})

app.get("/user_page", (req,res)=>{
    res.render("user_page.hbs", {})
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