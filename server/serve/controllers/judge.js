const Code = require('../../code')
const db = require('mongoose')
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
  // const session = await db.startSession()
  // await session.startTransaction({
  //   readConcern: { level: 'snapshot' },
  //   writeConcern: { w: 'majority' },
  //   readPreference: 'primary'
  // })
  try {
    const judge = ctx.request.body
    const res0 = await Judge.create(judge)

    const teams = []
    const filters = {
      $or: []
    }
    judge.teams.forEach(item => {
      teams.push({ $addToSet: { mumbers: [judge.name] } })
      filters.$or.push({ name: item.name })
    })
    console.log(filters)
    const res1 = Team.updateMany(filters, teams, {})
    console.log('J', res0)
    console.log('H', res1)
    ctx.body = {
      code: Code.SUCCESS,
      data: res0
    }
  } catch (err) {
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
