const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  members: [
    {
      type: ObjectId,
      ref: 'judge'
    }
  ]
  //  [
  //   {
  //     _id: { type: ObjectId, require: true },
  //     name: { type: String, require: true }
  //   }
  // ]
})

module.exports = mongoose.model('team', TeamSchema)
