// const Team = require('../modules/team')
const Team = require('../modules/team')
const Code = require('../../code')
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
 * 新增团队
 * @param {*} ctx
 */
const Add = async ctx => {
  const team = ctx.request.body
  Team.create(team)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}
/**
 *
 * @param {*} ctx
 */
const Get = async ctx => {
  const res = await Team.find({})
  ctx.body = {
    code: Code.SUCCESS,
    data: res
  }
}

module.exports = {
  Test,
  Add,
  Get
}
