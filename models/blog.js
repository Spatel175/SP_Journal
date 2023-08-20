const { default: mongoose, Schema } = require("mongoose");

const schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);   //store singular version of collection name
module.exports = Blog;

