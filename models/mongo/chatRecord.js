const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatRecordSchema = new Schema({
  message: {
    type: String,
    required : true
  },
  roomNumber: {
    type: String
  },
  sender: {
    type: Number,
    required : true
  },
  receiver: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('ChatRecord', chatRecordSchema)