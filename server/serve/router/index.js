const Router = require('@koa/router')
const baseApi = require('../../config').baseApi
const avatar = require('./api/avatar')
const team = require('./api/team')
const judge = require('./api/judge')
const router = new Router()

router.use(baseApi, avatar.routes())
router.use(baseApi, team.routes())
router.use(baseApi, judge.routes())

module.exports = router
