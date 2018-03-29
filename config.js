const host = 'localhost'

module.exports = {
  port: process.env.port || process.env.PORT || '3000',
  mongoUrl: process.env.MONGODB_URI || 'mongodb://root:root@ds117158.mlab.com:17158/messenger' || `mongodb://${host}/foods`
}
