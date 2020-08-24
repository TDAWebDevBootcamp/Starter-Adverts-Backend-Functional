const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
  name: String,
  price: Number
})

module.exports.Ad = mongoose.model('Ad', adSchema)