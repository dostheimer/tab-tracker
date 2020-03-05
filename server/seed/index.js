const mongoose = require('mongoose')
const config = require('./config/config')

const users = require('./users')
const songs = require('./songs')
const bookmarks = require('./bookmarks')
const history = require('./history')

mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async (conn) => {
    console.log('Connected to MongoDB')
    await users()
    await songs()
    await bookmarks()
    await history()
    conn.connection.close()
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })
