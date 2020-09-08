const mongoose = require("mongoose")

let Review = mongoose.model("review", {
    title: String,
    game_id: String,
    user_id: String,
    rating: Number,
    review: String,
    upvote: Number,
    downvote: Number,
    comment_id: [String]
})

module.exports = {
    Review
}