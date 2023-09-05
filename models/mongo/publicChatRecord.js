const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publicChatRecordSchema = new Schema({
  message: {
    type: String,
    required : true
  },
  avatar: {
    type: String,
    required: true
  },
  sender: {
    type: Number,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})


module.exports = mongoose.model('public_chat_records', publicChatRecordSchema)