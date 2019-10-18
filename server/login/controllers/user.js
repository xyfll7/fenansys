const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateRegisterInput = require('./validation/register')
const validateLoginInput = require('./validation/login')
const config = require('../config/config')
const User = require('../modules/user')
const Code = require('../config/code')

/**
 * 测试
 */
const Test = async ctx => {
  ctx.body = {
    test: ctx.request.body.test,
    code: '🔙嘛嘛'
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
    ctx.body = { errors, code: Code.SUCCESS }
    return
  }
  const { email, password } = ctx.request.body
  const [user] = await User.find({ email }) // 获取用户信息
  if (!user) {
    ctx.body = { email: '用户不存在', code: Code.SUCCESS }
  } else {
    let result = await bcrypt.compareSync(password, user.password)
    if (result) {
      const payload = {
        id: user._id,
        name: user.name
      }
      const token = jwt.sign(payload, config.secretOrKey, { expiresIn: 3600 })
      ctx.body = { token: 'Bearer ' + token, code: Code.SUCCESS }
    } else {
      ctx.body = { password: '密码错误!', code: Code.SUCCESS }
    }
  }
}

/**
 * 获取用户信息
 */
const GetUser = async ctx => {
  try {
    const raw = ctx.request.header.authorization.split(' ').pop()
    const { id } = jwt.verify(raw, config.secretOrKey)
    const user = await User.findById(id).lean()
    user.password = ''
    ctx.body = { user, code: Code.SUCCESS }
  } catch (err) {
    ctx.throw(401, err)
  }
}

module.exports = {
  Register,
  Login,
  GetUser,
  Test
}
