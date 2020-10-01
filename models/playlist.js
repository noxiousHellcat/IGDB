const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    title: String,
    genre: String,
    publisher: String,
    developer: String,
    year: String,
    description: String
})

const playlistSchema = new mongoose.Schema({
    title: String,
    private: Boolean,
    user_id: String,
    description: String,
    games: [gameSchema]
})

let Playlist = mongoose.model("playlist", playlistSchema)

module.exports = {
    Playlist
}