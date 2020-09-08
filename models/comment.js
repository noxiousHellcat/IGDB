const mongoose = require("mongoose")

let Comment = mongoose.model("comment", {
    comment: String,
    user_id: String
})

module.exports = {
    Comment
}