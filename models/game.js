const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    _id: String,
    comment: String,
    review_id: String
})

const reviewSchema = new mongoose.Schema({
    _id: String,
    title: String,
    game_id: String,
    rating: Number,
    review: String,
    upvote: Number,
    downvote: Number,
    comments: [commentSchema]
})

const gameSchema = new mongoose.Schema({
    title: String,
    art: [String], //array of links to images
    genre: String,
    publisher: String,
    developer: String,
    year: String,
    description: String,
    reviews: [reviewSchema]
})

let Game = mongoose.model("game", gameSchema)

module.exports = {
    Game
}