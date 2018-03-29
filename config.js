const host = 'localhost'

module.exports = {
  port: process.env.port || process.env.PORT || '8000',
  mongoUrl: process.env.MONGODB_URI || `mongodb://${host}/foods`
}
