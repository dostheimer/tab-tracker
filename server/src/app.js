const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

const config = require('./config/config')

let mdbConnection = null

mongoose.connect(config.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    (conn) => { 
      mdbConnection = conn
      console.log('Connected to MongoDB')
    },
    err => { /** handle initial connection error */ console.log(err) }
);

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

require('./routes')(app)

app.listen(config.httpPort)
console.log(`Server started on ${config.httpPort}`)

// Correctly handle shutdown from OS
process.on('SIGINT', function onSigint() {
  app.shutdown();
});

process.on('SIGTERM', function onSigterm() {
  app.shutdown();
});

app.shutdown = async function () {
  // clean up your resources and exit
  console.log('Disconnecting from MongoDB') 
  await mdbConnection.connection.close() 
  process.exit();
};
