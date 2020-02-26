const {Song} = require('../models')

module.exports = {
  async index (req,res) {
    try {
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.find({
          $or: 
            [
              'title', 'artist', 'genre', 'album'
            ].map(key => {
              return {
                [key]: new RegExp(search,'i')
              }
            })
        })
      } else {
        songs = await Song.find().limit(10)
      }
      
      res.send(songs)
    } catch (err) {
      console.log(`Error ${err}`)
      res.status(500).send({
        error: 'An error has occured trying to fetch the songs.'
      })
    }
  },
  async show (req,res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to show the song.'
      })
    }
  },
  async post (req,res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the song.'
      })
    }
  },
  async put (req,res) {
    try {
      const song = await Song.updateOne({
          _id: req.params.songId
        },req.body)
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update the song.'
      })
    }
  }
}
