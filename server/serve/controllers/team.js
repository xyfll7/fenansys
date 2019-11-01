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
  try {
    console.log(ctx.request.body)
    const team = ctx.request.body
    const res = await Team.create(team)
    ctx.body = {
      code: Code.SUCCESS,
      data: res
    }
  } catch (err) {
    if (err.code === 11000) {
      const { name } = ctx.request.body
      ctx.body = {
        code: Code.SUCCESS,
        message: `${name}团队已经存在，请不要重复添加`
      }
    } else {
      ctx.body = {
        code: Code.BUSINESS_ERROR,
        massage: '添加团队失败，请重试'
      }
    }
  }
}
/**
 *
 * @param {*} ctx
 */
const Get = async ctx => {
  try {
    const res = await Team.find({})
    ctx.body = {
      code: Code.SUCCESS,
      data: res
    }
  } catch (err) {
    console.log(err)
  }
}
/**
 * @param {*} ctx
 */
const Delete = async ctx => {
  try {
    const _id = ctx.request.body
    const res = await Team.deleteOne(_id)
    if (res.deletedCount) {
      ctx.body = {
        code: Code.SUCCESS,
        data: _id
      }
    } else {
      ctx.body = {
        code: Code.BUSINESS_ERROR,
        message: '团队已被删除，请刷新页面'
      }
    }
  } catch (err) {
    console.log(err)
  }
}
/**
 *
 */
const Update = async ctx => {
  try {
    const team = ctx.request.body
    const { _id } = team
    const res = await Team.findByIdAndUpdate(_id, team, { new: true })
    ctx.body = {
      code: Code.SUCCESS,
      data: res
    }
  } catch (err) {
    ctx.body = {
      code: Code.BUSINESS_ERROR,
      message: '修改团队失败，请重试'
    }
  }
}
module.exports = {
  Test,
  Add,
  Get,
  Delete,
  Update
}
