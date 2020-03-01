const History = require('../src/models/History')
const User = require('../src/models/User')
const Song = require('../src/models/Song')

function seedHistory () {
  return new Promise(async (resolve,reject) => {
    try {
      const histories = []
      const historySeedData = [
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
        await History.collection.drop()
      } catch (err) {
        console.log('Collection Doesn\'t Exist')
      }
      
      for (historySeed of historySeedData) {
        console.log(`Generating History... ${historySeed.user} ${historySeed.song}`)
        histories.push(await History.create(historySeed))
      }
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = seedHistory
