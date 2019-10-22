const user = require('./api/avatar')
const Router = require('@koa/router')
const baseApi = require('../../config').baseApi
const router = new Router()

router.use(baseApi, user.routes())

module.exports = router
