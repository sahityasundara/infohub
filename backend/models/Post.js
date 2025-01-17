const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Post', PostSchema);
