const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content_body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  tags: [{
    type: String,
    trim: true
  }],
  read_time: {
    type: Number,
    default: 1
  },
  media_ids: [{
    type: String
  }],
  publishedAt: {
    type: Date
  }
}, { timestamps: true })

postSchema.index({ slug: 1, author: 1 })

module.exports = mongoose.model('Post', postSchema)
