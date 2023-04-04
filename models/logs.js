const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  },
  shipIsBroken: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
