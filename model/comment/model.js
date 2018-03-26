const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  userAvatar: String,
  username: {type: String, required: true},
  comment: {type: String, required: true},
  resource: {type: String, required: true},
  createdAt: {type: Date }
})

module.exports = mongoose.model('Comment', commentSchema)
