const {History, Song} = require('../models')
const {Op} = require('sequelize')
const _ = require('lodash')

module.exports = {
  async index (req,res) {
    try {
      const userId = req.user.id

      const history = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))
      
      res.send(_.uniqBy(_.reverse(history), (iteratee) => iteratee.SongId))
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
        SongId: songId,
        UserId: userId
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
