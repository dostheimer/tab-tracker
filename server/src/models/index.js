const fs = require('fs')
const path = require('path')
const config = require('../config/config')
const db = {}

console.log(`Loading Models`)
fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach((file) => {
    console.log(`Importing Model ${file}`)
    const model = require(path.join(__dirname, file))
    db[model.modelName] = model
  })

module.exports = db
