const mongoose = require("mongoose")

let User = mongoose.model("user", {
    username: String,
    email: String,
    password: String,
    birthday: String,
    address: String,
    registration_date: String,
    last_seen: Number,
    comment_id: [String],
    review_id: [String],
    playlist_id: [String] 
})

module.exports = {
    User
}