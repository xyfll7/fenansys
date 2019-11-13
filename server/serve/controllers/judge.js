const Code = require('../../code')
const DB = require('mongoose')
const Judge = require('../modules/judge')
const Team = require('../modules/team')

/**
 * 测试
 */
const Test = async ctx => {
  ctx.body = {
    client: ctx.request.body.test,
    server: '🔙嘛嘛,呀'
  }
}

/**
 * 新增法官
 * @param {*} ctx
 */
const Add = async ctx => {
  const judge = ctx.request.body
  const { teams } = judge
  // 构造法官所属团队_id过滤器
  const filters = { $or: [...teams.map(team => ({ _id: team._id }))] }
  const session = await DB.startSession()
  try {
    // https://docs.mongodb.com/master/core/transactions/#general-information
    await session.startTransaction({ readPreference: 'primary', readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } })
    const [judge0] = await Judge.create([judge], { session })
    const { name, _id } = judge0
    const update = { $addToSet: { members: { name, _id } } }
    const { n, nModified, ok } = await Team.updateMany(filters, update, { session })
    if (n === nModified && nModified === teams.length && ok) {
      ctx.body = {
        code: Code.SUCCESS,
        data: judge0
      }
      await session.commitTransaction()
    } else {
      throw new Error('添加法官失败，请重试')
    }
  } catch (err) {
    console.log(err)
    await session.abortTransaction()
    if (err.code === 11000) {
      const { name } = ctx.request.body
      ctx.body = {
        code: Code.DATA_ALREADY_EXISTED,
        message: `"${name}"法官已经存在，请不要重复添加`
      }
    } else {
      const { message } = err
      ctx.body = {
        code: Code.BUSINESS_ERROR,
        message
      }
    }
  } finally {
    await session.endSession()
  }
}
/**
 *
 * @param {*} ctx
 */
const Get = async ctx => {
  try {
    const res = await Judge.find({})
    ctx.body = {
      code: Code.SUCCESS,
      data: res
    }
  } catch (err) {
    console.log(err)
  }
}
/**
 *
 */
const Update = async ctx => {
  const judge = ctx.request.body
  const { _id, name } = judge
  const session = await DB.startSession()
  try {
    await session.startTransaction({ readPreference: 'primary', readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } })
    // 一、更新法官,并返回旧的法官
    const oldJudge = await Judge.findByIdAndUpdate(_id, judge, { session })
    // 二、对比新旧法官，找到删除了的法官所属团队 在相应的团队中删除法官
    const deleteJudge = { $pull: { members: { name, _id } } }
    const { deletedTeamsFilter, deletedlength } = Judge.deletedTeamsFilter(judge.teams, oldJudge.teams)
    if (deletedlength > 0) {
      const { nModified } = await Team.updateMany(deletedTeamsFilter, deleteJudge, { session })
      if (nModified !== deletedlength) {
        throw new Error('更新法官信息失败！请重试')
      }
    }
    // 三、对比新旧法官，找到新增了的法官所属团队 在相应的团队中添加法官
    const addJudge = { $addToSet: { members: { name, _id } } }
    const { addedTeamsFilter, addedlength } = Judge.addedTeamsFilter(judge.teams, oldJudge.teams)
    if (addedlength > 0) {
      const { nModified } = await Team.updateMany(addedTeamsFilter, addJudge, { session })
      if (addedlength !== nModified) {
        throw new Error('更新法官信息失败！请重试')
      }
    }
    await session.commitTransaction()
    ctx.body = {
      code: Code.SUCCESS,
      data: judge
    }
  } catch (err) {
    await session.abortTransaction()
    ctx.body = {
      code: Code.BUSINESS_ERROR,
      message: err.message
    }
  } finally {
    await session.endSession()
  }
}
/**
 * @param {*} ctx
 */
const Delete = async ctx => {
  const session = await DB.startSession()
  const judge = ctx.request.body
  const { teams, name, _id } = judge
  try {
    // https://docs.mongodb.com/master/core/transactions/#general-information
    await session.startTransaction({ readPreference: 'primary', readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } })
    // 一、删除法官
    const { deletedCount } = await Judge.deleteOne({ _id }, { session })
    // 二、找到法官的所属团队
    const filters = {
      $or: [...teams.map(team => ({ _id: team._id }))]
    }
    // 三、在相应团队中删除法官
    const update = { $pull: { members: { name, _id } } }
    const { nModified } = await Team.updateMany(filters, update, { session }) // 在相应的团队中删除法官
    if (nModified !== teams.length && !deletedCount) {
      throw new Error('删除法官失败，请重试')
    }
    await session.commitTransaction()
    ctx.body = {
      code: Code.SUCCESS,
      data: judge
    }
  } catch (err) {
    await session.abortTransaction()
    ctx.body = {
      code: Code.BUSINESS_ERROR,
      message: err.message
    }
  } finally {
    await session.endSession()
  }
}

module.exports = {
  Test,
  Add,
  Get,
  Update,
  Delete
}
