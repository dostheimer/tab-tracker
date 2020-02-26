const {Bookmark, Song} = require('../models')

const _ = require('lodash')

module.exports = {
  async index (req,res) {
    try {
      const userId = req.user.id
      const {songId} = req.query

      const query = {
        user: userId
      }
      if (songId) {
        query.song = songId
      }

      const bookmarks = await Bookmark.find(query)
        .populate('song', ['title','artist'])
  
      res.send(bookmarks)
    } catch (err) {
      console.log(`Error ${err}`)
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmark.'
      })
    }
  },
  async post (req,res) {
    try {
      const userId = req.user.id
      const {songId} = req.body

      const bookmark = await Bookmark.findOne({
        user: songId,
        song: userId
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'You already have this as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        song: songId,
        user: userId
      })
      res.send(newBookmark)
    } catch (err) {
      console.log(`Error ${err}`)
      res.status(500).send({
        error: 'An error has occured trying to create a bookmark.'
      })
    }
  },
  async delete (req,res) {
    try {
      const userId = req.user.id
      const {bookmarkId} = req.params

      const bookmark = await Bookmark.findOne({
        _id: bookmarkId,
        user: userId
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'You do not have access to this bookmark.'
        })
      }
      await bookmark.remove()

      res.send(null)
    } catch (err) {
      console.log(`Error ${err}`)
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark.'
      })
    }
  }
}
