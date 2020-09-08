const mongoose = require("mongoose")

let Playlist = mongoose.model("playlist", {
    title: String,
    private: Boolean,
    user_id: String,
    description: String,
    game_id: [String]
})

module.exports = {
    Playlist
}