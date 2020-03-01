const Bookmark = require('../src/models/Bookmark')
const User = require('../src/models/User')
const Song = require('../src/models/Song')

function seedBookmarks () {
  return new Promise(async (resolve,reject) => {
    try {
      const bookmarks = []
      const bookmarkSeedData = [
        {
          song: (await Song.findOne({
            title: 'Float On'
          })).id,
          user: (await User.findOne({
            email: 'testing@gmail.com'
          })).id
        }
      ]

      try {
        await Bookmark.collection.drop()
      } catch (err) {
        console.log('Collection Doesn\'t Exist')
      }
      
      for (bookmarkSeed of bookmarkSeedData) {
        console.log(`Generating Bookmark... ${bookmarkSeed.user} ${bookmarkSeed.song}`)
        bookmarks.push(await Bookmark.create(bookmarkSeed))
      }
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = seedBookmarks
