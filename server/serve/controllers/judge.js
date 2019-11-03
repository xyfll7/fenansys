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
  console.log('sss')
  const session = await DB.startSession({ readPreference: 'primary' })
  try {
    await session.startTransaction({ readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } })
    const judge = ctx.request.body
    const { teams, name } = judge
    const res0 = await Judge.create([judge], { session })

    const filters = {
      $or: teams.map(team => {
        const { _id } = team
        return { _id }
      })
    }
    console.log(filters)
    const update = { $addToSet: { members: name } }
    const res1 = await Team.updateMany(filters, update, { session })
    console.log('H', res1)
    ctx.body = {
      code: Code.SUCCESS,
      data: res0
    }
  } catch (err) {
    session.abortTransaction()
    console.log('K', err)
    if (err.code === 11000) {
      const { name } = ctx.request.body
      ctx.body = {
        code: Code.SUCCESS,
        message: `"${name}"法官已经存在，请不要重复添加`
      }
    } else {
      ctx.body = {
        code: Code.BUSINESS_ERROR,
        massage: '添加法官失败，请重试'
      }
    }
  } finally {
    console.log('endSession~!@')
    session.endSession()
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
