const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistorySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }
})


module.exports = mongoose.model('History', HistorySchema);
