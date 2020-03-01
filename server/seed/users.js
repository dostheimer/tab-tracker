const User = require('../src/models/User')

function seedUsers () {
  return new Promise(async (resolve,reject) => {
    try {
      const users = []
      const userSeedData = [
        {
          email: 'testing@gmail.com',
          password: '12345678'
        }
      ]

      try {
        await User.collection.drop()
      } catch (err) {
        console.log('Collection Doesn\'t Exist')
      }
      
      for (userSeed of userSeedData) {
        console.log(`Generating User... ${userSeed.email}`)
        users.push(await User.create(userSeed))
      }
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = seedUsers
