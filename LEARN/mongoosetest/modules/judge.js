const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const JudgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  office: { type: String, required: true },
  position: { type: String, required: true },
  proportion: { type: Number, required: true },
  tel: { type: String, required: true },
  // teams: [{ type: ObjectId, ref: 'team', required: true }]
  teams: [
    {
      // _id: { type: ObjectId,  require: true },
      // _id: { type: ObjectId, ref: 'team', require: true },
      team: { type: ObjectId, ref: 'team', require: true },
      // name: { type: String, require: true },
      numberOfCasesHandled: { type: [Number], require: true }
    }
  ]
})

module.exports = mongoose.model('judge', JudgeSchema)
