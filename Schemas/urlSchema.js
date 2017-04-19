const mongoose = require('mongoose');
let {Schema }= mongoose

const urlSchema = new Schema({
  id: String,
  url: String
})

var URL = mongoose.model('url', urlSchema)

module.exports = URL
