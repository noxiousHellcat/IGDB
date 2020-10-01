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
    genre: String,
    publisher: String,
    developer: String,
    year: Number,
    description: String
})

const playlistSchema = new mongoose.Schema({
    _id: String,
    title: String,
    private: Boolean,
    user_id: String,
    description: String,
    games: [gameSchema]
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    comments: [commentSchema],
    reviews: [reviewSchema],
    playlists: [playlistSchema]
})

let User = mongoose.model("user", userSchema)

module.exports = {
    User
}