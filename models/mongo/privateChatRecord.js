const mongoose = require('mongoose')
const Schema = mongoose.Schema

const privateChatRecordSchema = new Schema({
  message: {
    type: String,
    required : true
  },
  avatar: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required : true
  },
  sender: {
    type: Number,
    required : true
  },
  receiver: {
    type: Number,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})


module.exports = mongoose.model('private_chat_records', privateChatRecordSchema)