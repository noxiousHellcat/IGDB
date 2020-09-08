const mongoose = require("mongoose")

let Game = mongoose.model("game", {
    title: String,
    genre: String,
    publisher: String,
    developer: String,
    year: Number,
    description: String,
    review_id: [String]
})

module.exports = {
    Game
}