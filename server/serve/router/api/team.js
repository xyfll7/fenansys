const Router = require('@koa/router')
const Team = require('../../controllers/team')

const router = new Router()

router
  .prefix('/team')
  .post('/add', Team.Add)
  .get('/get', Team.Get)
  .delete('/delete', Team.Delete)
  .post('/update', Team.Update)

module.exports = router
