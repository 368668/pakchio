const mongoose = require('mongoose')
const config = require('./../config')

mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err
  console.log('Welcome to connect Mongodb')
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));