const mongoose = require("mongoose");
const {Schema} = mongoose;

const BlogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0,
       
    }
}, )

module.exports = mongoose.model("Blog", BlogSchema);