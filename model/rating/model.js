const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  userId: {type: String, required: true},
    userAvatar: String,
    username: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, required: true},
  resource: {type: String, required: true},
    city: String
})

module.exports = mongoose.model('Rating', ratingSchema)
