const mongoose = require('mongoose')

const JudgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  office: { type: String, required: true },
  position: { type: String, required: true },
  proportion: { type: Number, required: true },
  tel: { type: Number, required: true },
  teams: [
    {
      name: { type: String, require: true },
      numberOfCasesHandled: [
        {
          month: { type: Number, require: true }
        },
        {
          number: { type: Number, require: true }
        }
      ]
    }
  ]
})

module.exports = mongoose.model('judges', JudgeSchema)
