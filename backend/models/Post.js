const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
postSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema); 