const {History, Song} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req,res) {
    try {
      const userId = req.user.id

      const history = await History.find({
        user: userId
        })
        .populate('song', ['title','artist'])
        
        /* .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        )) */
      
      res.send(_.uniqBy(_.reverse(history), (iteratee) => iteratee.song))
    } catch (err) {
      console.log(`Error ${err}`)
      res.status(500).send({
        error: 'An error has occured trying to fetch the history.'
      })
    }
  },
  async post (req,res) {
    try {
      const userId = req.user.id
      const {songId} = req.body

      const history = await History.create({
        song: songId,
        user: userId
      })
      res.send(history)
    } catch (err) {
      console.log(`Error ${err}`)
      res.status(500).send({
        error: 'An error has occured trying to create a history.'
      })
    }
  }
}
