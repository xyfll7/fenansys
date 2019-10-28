const Router = require('@koa/router')
const Team = require('../../controllers/team')

const router = new Router()

router
  .prefix('/team')
  .post('/add', Team.Add)
  .get('/get', Team.Get)

module.exports = router
