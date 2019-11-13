const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const JudgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  office: { type: String, required: true },
  position: { type: String, required: true },
  proportion: { type: Number, required: true },
  tel: { type: String, required: true },
  teams: [
    {
      // _id: { type: ObjectId,  require: true },
      _id: { type: ObjectId, ref: 'team', require: true },
      name: { type: String, require: true },
      numberOfCasesHandled: { type: [Number], require: true }
    }
  ]
})

// 删除了的法官所属团队（构造一个_id过滤器）
JudgeSchema.statics.deletedTeamsFilter = (newTeams, oldTeams) => {
  // 对比编辑前后的团队数据，找出被删除的团队
  const deletedTeams = oldTeams.filter(team => {
    let isMatch = true
    newTeams.forEach(team0 => {
      if (team._id.toString() === team0._id.toString()) {
        isMatch = false
      }
    })
    return isMatch
  })
  // 删除了的法官所属团队_id（构造过滤器）
  const deletedTeamsFilter = { $or: [...deletedTeams.map(team => ({ _id: team._id }))] }
  // 过滤器不能是空数组 修改匹配文档要等于数组长度（有几个团队就要修改几个团队,否则视为失败）
  const deletedlength = deletedTeams.length
  return { deletedTeamsFilter, deletedlength }
}

// 新增了的法官所属团队（构造一个_id过滤器）
JudgeSchema.statics.addedTeamsFilter = (newTeams, oldTeams) => {
  // 对比编辑前后的团队数据，找出新增的团队
  const addedTeams = newTeams.filter(team => {
    let isMatch = true
    oldTeams.forEach(team0 => {
      if (team._id.toString() === team0._id.toString()) {
        isMatch = false
      }
    })
    return isMatch
  })
  // 新增了的法官所属团队_id（构造过滤器）
  const addedTeamsFilter = { $or: [...addedTeams.map(team => ({ _id: team._id }))] }
  // 过滤器不能是空数组 修改匹配文档要等于数组长度（有几个团队就要修改几个团队,否则视为失败）
  const addedlength = addedTeams.length
  return { addedTeamsFilter, addedlength }
}

module.exports = mongoose.model('judges', JudgeSchema)
