const express = require("express")
const session = require("express-session")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const {Game} = require("./models/game.js")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended:false
})

// mongoose.connect("mongodb://127.0.0.1:27017/games", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB...')).catch((err) => console.error("Coudn't connect MongoDB....", err));

// let game = new Game({
//     title: "game"
// })

// game.save().then((doc)=>{
//     console.log("Successfully added: " + doc)
// }, (err)=>{
//     console.log("Error in adding: "+ err)
// })

app.set("view engine", "hbs")

app.use(express.static(__dirname + '/public'));

app.get("/", urlencoder, (req,res)=>{
    //access the main page
    res.render("home.hbs", {})
})

app.get("/database", urlencoder, (req,res)=>{
    //access the database page
    res.render("database.hbs", {})
})


app.get("/search", urlencoder, (req,res)=>{
    //access the database page
    if(req.query.search_select=="user"){
        res.render("user_page.hbs", {})
    }else if(req.query.search_select=="game"){
        res.render("game.hbs", {})
    }
})

app.get("/login", urlencoder, (req,res)=>{
    //go to log in page
    res.render("login.hbs", {})
})

app.get("/about", urlencoder, (req,res)=>{
    //go to log in page
    res.render("about.hbs", {})
})


app.get("/game", urlencoder, (req,res)=>{
    //view a game
    res.render("game.hbs", {})
})

app.get("/user_page", urlencoder, (req,res)=>{
    //view a user

    res.render("user_page.hbs", {})
})

app.get("/playlist", urlencoder, (req,res)=>{
    //view a playlist

    res.render("playlist.hbs", {})
})

app.get("/review", urlencoder, (req,res)=>{
    //view a review

    res.render("review.hbs", {})
})

app.post("/game", urlencoder, (req,res)=>{
    //create a game
    let title = req.body.title
    let genre = req.body.genre
    let publisher = req.body.publisher
    let developer = req.body.developer
    let year = req.body.year
    let description = req.body.description

    res.render("game.hbs", {})
})

app.post("/comment", urlencoder, (req,res)=>{
    //create a comment
    let comment = req.body.comment
    let user_id = req.body.user_id

    res.render("review.hbs", {})
})

app.post("/review", urlencoder, (req,res)=>{
    //create a review
    let title = req.body.title
    let game_id = req.body.game_id
    let user_id = req.body.user_id
    let rating = req.body.rating
    let review = req.body.review

    res.render("review.hbs", {})
})

app.post("/playlist", urlencoder, (req,res)=>{
    //create a playlist
    let title = req.body.title
    let private = req.body.private
    let user_id = req.body.user_id
    let description = req.body.description

    res.render("playlist.hbs", {})
})

app.post("/playlist_add", urlencoder, (req,res)=>{
    //create a playlist
    let game = req.body.game

    res.render("playlist.hbs", {})
})

app.post("/login", urlencoder, (req,res)=>{
    //user log in
    if(req.body.username==="admin" && req.body.password==="1234"){
        res.render("home.hbs", {})
    }else if(req.body.username==="username" && req.body.password==="password"){
        res.render("home.hbs", {})
    }else{
        res.render("home.hbs", {})
    }
})

app.post("/register", urlencoder, (req,res)=>{
    //register as a user
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let birthday = req.body.birthday
    let address = req.body.address

    res.render("user_page.hbs", {})
})

app.post("/forgotpassword", urlencoder, (req,res)=>{
    //retrieve forgotten password
    let username = req.body.username
    let email = req.body.email

    res.render("home.hbs", {})
})


app.listen(3000, function(){
    console.log("Listening to port 3000")
})
