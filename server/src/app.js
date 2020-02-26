const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config/config')
const app = express()

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    () => { console.log(`Connected to DB mongodb://${config.db.host}:${config.db.port}/${config.db.database}`) },
    err => { /** handle initial connection error */ console.log(err) }
);

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

require('./routes')(app)

app.listen(config.port)
console.log(`Server started on ${config.port}`)
