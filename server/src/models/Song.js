const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
  title:{type:String,require:true},
  artist:{type:String,require:true},
  genre:{type:String,require:true},
  album:{type:String,require:true},
  albumImageUrl:{type:String,require:true},
  youtubeId:{type:String,require:true},
  lyrics:{type:String,require:true},
  tab:{type:String,require:true}
})

module.exports = mongoose.model('Song', SongSchema);
