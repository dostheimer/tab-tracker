const mongoose = require('mongoose')
const config = require('../src/config/config')

const users = require('./users')
const songs = require('./songs')
const bookmarks = require('./bookmarks')
const history = require('./history')

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async (conn) => {
    console.log(`Connected to DB mongodb://${config.db.host}:${config.db.port}/${config.db.database}`)
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
