const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  userAvatar: String,
  username: {type: String, required: true},
  comment: {type: String, required: true},
    resource: {type: String, required: true},
})

module.exports = mongoose.model('Comment', commentSchema)
