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
  const session = await DB.startSession()
  const judge = ctx.request.body
  const { teams } = judge
  const filters = {
    $or: teams.map(team => {
      const { _id } = team
      return { _id }
    })
  }

  try {
    // https://docs.mongodb.com/master/core/transactions/#general-information
    await session.startTransaction({
      readPreference: 'primary',
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    })
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
        code: Code.SUCCESS,
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
const Get = async ctx => {}
/**
 *
 */
const Update = async ctx => {}
/**
 * @param {*} ctx
 */
const Delete = async ctx => {}

module.exports = {
  Test,
  Add,
  Get,
  Update,
  Delete
}
