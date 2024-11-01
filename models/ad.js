const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
  name: String,
  price: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports.Ad = mongoose.model('Ad', adSchema)