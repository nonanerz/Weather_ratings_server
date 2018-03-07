const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  logoUrl: String,
  url: String,
})

module.exports = mongoose.model('Resource', resourceSchema)
