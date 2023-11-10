const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  },
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   auto: true,
  // },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
