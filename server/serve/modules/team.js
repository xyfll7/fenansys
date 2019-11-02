const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  mumbers: [String]
})

module.exports = mongoose.model('teams', TeamSchema)
