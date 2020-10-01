const express = require("express")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const MongoStore = require('connect-mongo')(session)

const {Game} = require("./models/game.js")
const {User} = require("./models/user.js")
const {Playlist} = require("./models/playlist.js")
const {Review} = require("./models/review.js")
const {Comment} = require("./models/comment.js")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended:true
})

mongoose.connect("mongodb://127.0.0.1:27017/games", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('Connected to MongoDB...')).catch((err) => console.error("Coudn't connect MongoDB....", err));

const db = mongoose.connection

// // Handle 404
// app.use(function(req, res) {
//     res.status(400);
//    res.render('404', {title: '404: File Not Found'});
// });

// // Handle 500
// app.use(function(error, req, res, next) {
//     res.status(500);
//    res.render('500', {title:'500: Internal Server Error', error: error});
// });

app.use(cookieparser());
app.use(session({
    secret: 'my-igdb-69420',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*60
    },
    store: new MongoStore({ mongooseConnection: db })
}));

//RETRIEVE ONE
// Game.findOne({
//     _id: "5f56ebbba57a9f2b5c599c48"
// }).then((doc)=>{
//     console.log(JSON.stringify(doc))
// }, (err)=>{
//     console.log(err)
// })

//RETRIEVE MANY
// Game.find({}).then((docs)=>{
//     for(let i = 0; i < docs.length; i++){
//         console.log(JSON.stringify(docs[i]))
//     }
// }, (err)=>{
//     console.log(err)
// })

//DELETE ONE
// Game.deleteOne({
//     _id: "5f56ebbba57a9f2b5c599c48"
// }).then((doc)=>{
//     console.log("Deleted " + doc.n + " document/s.")
// }, (err)=>{
//     console.log(err)
// })

//UPDATE
// Game.findOneAndUpdate({
//     _id:"5f6fa36ac3c15166edb89780"
// },{
//     title: "game5"
// },{
//     new: true
// }).then((doc)=>{
//      console.log("Updated " +JSON.stringify(doc))
// }, (err)=>{
//      console.log(err)
// })

app.set("view engine", "hbs")

app.use(express.static(__dirname + '/public'));

app.get("/", urlencoder, (req,res)=>{
    //access the main page
    console.log(req.session)
    if(req.session){
        res.render("home.hbs", {
            admin:req.session.admin, 
            susername:req.session.username, 
            uid:req.session.user_id
        })
    }else{
        res.render("home.hbs", {})
    }
    
})

app.get("/database", urlencoder, (req,res)=>{
    //access the database page
    //load all games
    console.log("admin? "+req.session.admin)
    Game.find({}).then((docs)=>{
        res.render("database.hbs", {
            docs:docs, 
            admin:req.session.admin, 
            susername:req.session.username, 
            uid:req.session.user_id
        })
    }, (err)=>{
        console.log(err)
    })
})


app.get("/search", urlencoder, (req,res)=>{
    //access the database page
    if(req.query.search_select=="user"){
        User.findOne({
            username: req.query.query
        }).then((doc)=>{
            if(doc){
                res.redirect("/user_page?uid="+doc._id);
            }else{
                console.log("===NO USER FOUND===")
                res.redirect("/user_page");
            }
            
        }, (err)=>{
            console.log(err)
        })
    }else if(req.query.search_select=="game"){
        Game.findOne({
            title: req.query.query
        }).then((doc)=>{
            if(doc){
                res.redirect("/game?id="+doc._id);
            }else{
                console.log("===NO GAME FOUND===")
                res.redirect("/game");
            }
        }, (err)=>{
            console.log(err)
        })
    }
})

app.get("/login", urlencoder, (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    res.render("login.hbs", {})
})

app.get("/about", urlencoder, (req,res)=>{
    //go to log in page
    res.render("about.hbs", {})
})


app.get("/game", urlencoder, (req,res)=>{
    //view a game
    console.log(req.query.gid)
    Game.findOne({
        _id: req.query.gid
    }).then((doc)=>{
        res.render("game.hbs", {
            title:doc.title,
            // art: doc., 
            genre: doc.genre,
            publisher: doc.publisher,
            developer: doc.developer,
            year: doc.year,
            reviews: doc.reviews,
            description: doc.description,
            admin:req.session.admin, 
            susername:req.session.username, 
            uid:req.session.user_id,
            gid:req.query.gid
        })
    }, (err)=>{
        console.log(err)
    })
})

app.get("/user_page", urlencoder, (req,res)=>{
    //view own user page
    //if viewed user is not the same as logged in, hide options
    let owned = 0
    User.findOne({
        _id: req.query.uid
    }).then((doc)=>{
        // console.log(JSON.stringify(doc))
        if(doc._id == req.session.user_id){
            owned = 1
        }
        res.render("user_page.hbs", {
            susername: req.session.username, 
            uid:req.session.user_id, 
            username: doc.username, 
            playlists: doc.playlists,
            reviews: doc.reviews,
            comments: doc.comments,
            owned: owned
        })
    }, (err)=>{
        console.log(err)
    })
})

app.get("/playlist", urlencoder, (req,res)=>{
    //view a playlist
    //if viewed playlist does not belong to logged in user, hide options
    //check if already added
    let games =[]    
    let _id = req.query.id
    let owned = 0
    Game.find({}).then((docs)=>{
        for(let i = 0; i < docs.length; i++){
            games[i]=docs[i]
        }
        Playlist.findOne({
            _id: _id
        }).then((doc)=>{
            if(doc.user_id == req.session.user_id){
                owned = 1
            }
            console.log(doc.games)
            res.render("playlist.hbs", {
                games:games, 
                pid:doc._id,
                title:doc.title, 
                description: doc.description, 
                pgames: doc.games,
                owned: owned,
                susername:req.session.username, 
                uid:req.session.user_id,
                gid:req.query.gid
            })
        }, (err)=>{
            console.log(err)
        })
    }, (err)=>{
        console.log(err)
    })
})

app.get("/review", urlencoder, (req,res)=>{
    //view a review
    let _id
    let title
    let user
    let rating
    let review
    let comments

    Review.findOne({
        _id: req.query.id
    }).then((doc)=>{
        _id=doc.id
        title=doc.title
        user={
            _id:doc.user._id,
            username:doc.user.username
        }
        rating= doc.rating
        review= doc.review
        comments= doc.comments


        Game.findOne({
            _id: doc.game_id
        }).then((doc)=>{
            res.render("review.hbs", {
                rid:_id,
                title: title,
                user: user,
                rating: rating,
                review: review,
                comments: comments,
                game_title: doc.title,
                susername:req.session.username, 
                uid:req.session.user_id,
                gid:req.query.gid
            })
        }, (err)=>{
            console.log(err)
        })
        
    }, (err)=>{
        console.log(err)
    })
})

//========================
//ADD NEW GAME(ADMIN ONLY)
//========================
app.post("/database", urlencoder, (req,res)=>{
    //create a game

    if(req.body.title && req.body.genre && req.body.publisher && req.body.developer && req.body.year){
        let title = req.body.title
        if(req.body.art){
            let art = req.body.art
        }
        let genre = req.body.genre
        let publisher = req.body.publisher
        let developer = req.body.developer
        let year = req.body.year
        let description = req.body.description
        
        let game = new Game({
            title: title,
            genre: genre,
            publisher: publisher,
            developer: developer,
            year: year,
            description: description
        })
        
        //check existing
        Game.findOne({
            title: title
        }).then((doc)=>{
            if(!doc){
                game.save().then((doc)=>{//add async
                    console.log("===GAME ADDED===")
                }, (err)=>{
                    console.log("Error: "+ err)
                })
            }else{
                console.log("===EXISTING TITLE===")
            }
        }, (err)=>{
            console.log(err)
        })
    }else{
        console.log("===MISSING FIELDS===")
    }
    res.redirect("/database");
})

app.post("/db_edit", urlencoder, (req,res)=>{
    let _id = req.body.edit_id
    let title = req.body.edit_title
    if(req.body.edit_art){
        let art = req.body.edit_art
    }
    let genre = req.body.edit_genre
    let publisher = req.body.edit_publisher
    let developer = req.body.edit_developer
    let year = req.body.edit_year
    let description = req.body.edit_description
    //edit game from database
    Game.findOne({
        _id: _id
    }).then((doc)=>{
        if(doc){
            console.log("1 "+title)
            console.log("2 "+doc)
            if(title == ""){
                title = doc.title
                console.log("3 "+title)
            }
            // if(art === ""){
            //     art = doc.art
            // }
            if(genre == ""){
                genre = doc.genre
            }
            if(publisher == ""){
                publisher = doc.publisher
            }
            if(developer == ""){
                developer = doc.developer
            }
            if(year == ""){
                year = doc.year
            }
            if(description == ""){
                description = doc.description
            }
        }else{
            console.log("===GAME NOT FOUND===")
        }
        
        Game.findOneAndUpdate({
            _id:_id
        },{
            title:title,
            genre:genre,
            // art:art,
            publisher:publisher,
            developer:developer,
            year:year,
            description:description
        },{
            new: true
        }).then((doc)=>{
            console.log("Updated " +JSON.stringify(doc))
            res.redirect("/database");
        }, (err)=>{
            console.log(err)
        })
    }, (err)=>{
        console.log(err)
    })
})

app.post("/db_delete", urlencoder, (req,res)=>{
    //delete game from database
    Game.deleteOne({
        _id: req.body.delete_id
    }).then((doc)=>{
        console.log("Deleted " + doc.n + " document/s.")
        res.redirect("/database");
    }, (err)=>{
        console.log(err)
    })
})
//====================
//COMMENTS AND REVIEWS
//====================
app.post("/comment", urlencoder, (req,res)=>{
    //create a comment
    let comment = req.body.comment
    let user_id = req.body.uid
    let username = req.body.username
    let review_id = req.body.rid

    let new_comment = new Comment({
        comment: comment,
        review_id: review_id,
        user: {
            _id: user_id,
            username:username
        },
    })

    User.findOne({
        _id: user_id
    }).then((doc)=>{
        console.log("USER " + doc.username)
        doc.comments.push(new_comment)
        doc.save()
        Review.findOne({
            _id: review_id
        }).then((doc)=>{
            console.log("Commented on "+doc.title)
            doc.comments.push(new_comment)
            doc.save()
            new_comment.save()
            console.log("===COMMENT ADDED===")
            res.render("review.hbs", {})
        }, (err)=>{
            console.log(err)
        })
    }, (err)=>{
        console.log(err)
    })
})

app.get("/comment_del", urlencoder, (req,res)=>{
    //create a comment
    Comment.findOne({
        _id: req.query.id
    }).then((doc)=>{
        User.findOne({
            _id: doc.user._id
        }).then((doc)=>{
            doc.comments.pull({_id: req.query.id})
            doc.save()
        }, (err)=>{
            console.log(err)
        })
        Review.findOne({
            _id: doc.review_id
        }).then((doc)=>{
            doc.comments.pull({_id: req.query.id})
            doc.save()
        }, (err)=>{
            console.log(err)
        })
        Comment.deleteOne({
            _id: req.query.id
        }).then((doc)=>{
            console.log("Deleted " + doc.n + " document/s.")
            res.redirect("/user_page?uid="+req.session.user_id)
        }, (err)=>{
            console.log(err)
        })
    }, (err)=>{
        console.log(err)
    })
    
})

app.post("/review", urlencoder, (req,res)=>{
    //create a review
    let title = req.body.title
    let game_id = req.body.gid
    let user_id = req.session.user_id
    let username = req.session.username
    let rating = req.body.rating
    let review = req.body.review

    let new_review = new Review({
        title: title,
        game_id: game_id,
        user: {
            _id: user_id,
            username:username
        },
        rating: rating,
        review: review
    })

    User.findOne({
        _id: user_id
    }).then((doc)=>{
            doc.reviews.push(new_review)
            doc.save()
            Game.findOne({
                _id: game_id
            }).then((doc)=>{
                console.log(doc)
                doc.reviews.push(new_review)
                doc.save()
                new_review.save()
                console.log("===REVIEW ADDED===")
                res.render("review.hbs", {})
            }, (err)=>{
                console.log(err)
            })
    }, (err)=>{
        console.log(err)
    })
})

app.get("/review_del", urlencoder, (req,res)=>{
    //create a comment
    Review.findOne({
        _id: req.query.id
    }).then((doc)=>{
        User.findOne({
            _id: doc.user._id
        }).then((doc)=>{
            doc.reviews.pull({_id: req.query.id})
            doc.save()
        }, (err)=>{
            console.log(err)
        })
        Game.findOne({
            _id: doc.game_id
        }).then((doc)=>{
            doc.reviews.pull({_id: req.query.id})
            doc.save()
        }, (err)=>{
            console.log(err)
        })
        Review.deleteOne({
            _id: req.query.id
        }).then((doc)=>{
            console.log("Deleted " + doc.n + " document/s.")
            res.redirect("/user_page?uid="+req.session.user_id)
        }, (err)=>{
            console.log(err)
        })
    }, (err)=>{
        console.log(err)
    })
    
})
//===================
//PLAYLIST OPERATIONS
//===================
app.post("/playlist", urlencoder, (req,res)=>{
    //create a playlist
    console.log(req.session.user_id)

    if(req.body.title && req.body.private && req.session.user_id && req.body.description){
        let title = req.body.title
        let private = false
        if(req.body.private = "True"){
            private = true
        }else{
            private = false
        }
        let user_id = req.session.user_id
        let description = req.body.description
        
        console.log("boolin "+private)

        let playlist = new Playlist({
            title: title,
            private: private,
            user_id: user_id,
            description: description
        })
        
        //push new playlist to the array
        User.findOne({
            _id: user_id
        }).then((doc)=>{
            if(doc.playlists){
                console.log("Playlist? "+doc.playlists)
                doc.playlists.push(playlist)
                doc.save()
                playlist.save()
                res.redirect("/user_page?uid="+req.session.user_id)
                console.log("===PLAYLIST ADDED===")
            }else{
                doc.playlists[0] = playlist
                doc.save()
                playlist.save()
                res.redirect("/user_page?uid="+req.session.user_id)
                console.log("===FIRST PLAYLIST ADDED===")
            }
        }, (err)=>{
            console.log(err)
        })
    }else{
        console.log("===MISSING PLAYLIST FIELDS===")
    }
})

app.post("/playlist_add", urlencoder, (req,res)=>{
    //add game to playlist
    let game_id = req.body.game

    let game = new Game()

    Game.findOne({
        _id: game_id
    }).then((doc)=>{
        game = {
            _id: doc._id,
            title:doc.title,
            // art: doc., 
            genre: doc.genre,
            publisher: doc.publisher,
            developer: doc.developer,
            year: doc.year,
            description: doc.description
        }
        Playlist.findOne({
            _id: req.query.pid
        }).then((doc)=>{
            console.log(req.query.pid)
            if(doc.games){
                console.log("Games? "+doc.games)
                doc.games.push(game)
                doc.save()
                res.redirect("/playlist?id="+req.query.pid)
                console.log("===GAME ADDED===")
            }else{
                doc.games[0] = game
                doc.save()
                console.log("===FIRST GAME ADDED===")
            }
        }, (err)=>{
            console.log(err)
        })
    }, (err)=>{
        console.log(err)
    })
})

app.post("/playlist_remove", urlencoder, (req,res)=>{
    //add game to playlist
    let game = req.body.game

    res.render("playlist.hbs", {})
})

app.post("/playlist_edit", urlencoder, (req,res)=>{
    //add game to playlist
    let game = req.body.game

    res.render("playlist.hbs", {})
})

app.post("/playlist_delete", urlencoder, (req,res)=>{
    //add game to playlist
    let game = req.body.game

    res.render("playlist.hbs", {})
})

//=============================
//USER LOGGING AND REGISTRATION
//=============================
app.post("/login", urlencoder, (req,res)=>{
    //user log in
    let username = req.body.username
    let mykey = crypto.createCipher('aes-128-cbc', 'mcdonalds')
    let password = mykey.update(String(req.body.password), 'utf8', 'hex')
    password += mykey.final('hex')

    //search database for username match
    User.findOne({
        username: username
    }).then((doc)=>{
        if(doc){
            console.log(JSON.stringify(doc))
            //check if password matches

            if(doc.password === password){
                req.session.username = username
                req.session.user_id = doc._id
                req.session.loggedin = true
                if(username === "admin"){
                    req.session.admin = true
                }
                console.log("===SIGNED IN===")
                res.redirect("/");
            }else{
                console.log("===WRONG PASSWORD===")
                let error = "Wrong password."
                res.render("login.hbs", {error: error})
            }
        }else{
            let error = "User does not exist."
            res.render("login.hbs", {error: error})
        }
    }, (err)=>{
        console.log(err)
    })
})

app.get("/logout", urlencoder, (req,res)=>{
    //delete session
    req.session.destroy(function() {
        req.session = null
        console.log("===SIGNED OUT===")
        res.redirect("/");
    });
})

app.post("/register", urlencoder, (req,res)=>{
    //register as a user
    if(req.body.username && req.body.password && req.body.email){
        let username = req.body.username //check if unique
        let email = req.body.email
        
        let mykey = crypto.createCipher('aes-128-cbc', 'mcdonalds')
        let password = mykey.update(String(req.body.password), 'utf8', 'hex')
        password += mykey.final('hex')

        let user = new User({
            username: username,
            password: password,
            email: email
        })
        
        //check existing
        User.findOne({
            username: username
        }).then((doc)=>{
            if(!doc){
                user.save().then((doc)=>{//add async
                    console.log("===USER REGISTERED===")
                }, (err)=>{
                    console.log("Error: "+ err)
                })
            }else{
                console.log("===USERNAME TAKEN===")
            }
        }, (err)=>{
            console.log(err)
        })
    }else{
        console.log("===MISSING FIELDS===")
    }

    res.redirect("/login");
})

app.post("/forgotpassword", urlencoder, (req,res)=>{
    //retrieve forgotten password
    let username = req.body.username //check if match
    let email = req.body.email

    res.render("home.hbs", {})
})


app.listen(3000, function(){
    console.log("Listening to port 3000")
})
