const Judge = require('../modules/judge')
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
 * 新增法官
 * @param {*} ctx
 */
const Add = async ctx => {}
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
