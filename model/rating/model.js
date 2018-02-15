const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  userId: String,
  rating: Number,
  service: String,
})

module.exports = mongoose.model('Rating', ratingSchema)
