const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateRegisterInput = require('./validation/register')
const validateLoginInput = require('./validation/login')
const config = require('../../config')
const User = require('../modules/user')
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
 * 用户注册
 */
const Register = async ctx => {
  const { errors, isValid } = validateRegisterInput(ctx.request.body)
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }

  let { name, email, password } = ctx.request.body
  const findResult = await User.find({ email })
  if (findResult.length > 0) {
    ctx.status = 500
    ctx.body = { email: '邮箱已被占用' }
  } else {
    const user = new User({ name, email, password })
    ctx.body = await user.save()
  }
}

/**
 * 用户登陆获取Token
 */
const Login = async ctx => {
  const { errors, isValid } = validateLoginInput(ctx.request.body)
  if (!isValid) {
    ctx.body = {
      code: Code.SUCCESS,
      data: { errors }
    }
    return
  }
  const { email, password } = ctx.request.body
  const [user] = await User.find({ email }) // 获取用户信息
  console.log(user)
  if (!user) {
    ctx.body = {
      code: Code.SUCCESS,
      data: { email: '用户不存在' }
    }
  } else {
    let result = await bcrypt.compareSync(password, user.password)
    if (result) {
      const payload = {
        id: user._id,
        name: user.name
      }
      const token = jwt.sign(payload, config.secretOrKey, { expiresIn: 3600 })
      ctx.body = {
        code: Code.SUCCESS,
        data: { token: 'Bearer ' + token }
      }
    } else {
      ctx.body = {
        code: Code.SUCCESS,
        data: { password: '密码错误!' }
      }
    }
  }
}

/**
 * 获取用户信息
 */
const Info = async ctx => {
  try {
    const raw = ctx.request.header.authorization.split(' ').pop()
    const { id } = jwt.verify(raw, config.secretOrKey)
    const user = await User.findById(id).lean()
    user.password = ''
    ctx.body = {
      code: Code.SUCCESS,
      data: { user }
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.body = {
        code: Code.TOKEN_EXPIRES,
        message: '登陆超时，请重新登陆'
      }
    } else {
      ctx.throw(401, err)
    }
  }
}

module.exports = {
  Test,
  Register,
  Login,
  Info
}
