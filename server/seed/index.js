const {
  sequelize,
  Song,
  User,
  Bookmark,
  History
} = require('../src/models')

const Promise = require('bluebird')
const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')
const history = require('./history.json')

sequelize.sync({force: true})
  .then(async () => {
    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    await Promise.all(
      songs.map(song => {
        return Song.create(song)
      })
    )

    await Promise.all(
      bookmarks.map(bookmark => {
        return Bookmark.create(bookmark)
      })
    )

    await Promise.all(
      history.map(hist => {
        return History.create(hist)
      })
    )
  })
