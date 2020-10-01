const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    _id: String,
    comment: String,
    review_id: String,
    user: {
        _id: String, 
        username: String
    },
})

const reviewSchema = new mongoose.Schema({
    title: String,
    user: {
            _id: String, 
            username: String
        },
    game_id: String,
    rating: Number,
    review: String,
    comments: [commentSchema]
})

let Review = mongoose.model("review", reviewSchema)

module.exports = {
    Review
}