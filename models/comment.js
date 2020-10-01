const mongoose = require("mongoose")

let Comment = mongoose.model("comment", {
    comment: String,
    review_id: String,
    user: {
        _id: String, 
        username: String
    },
})

module.exports = {
    Comment
}