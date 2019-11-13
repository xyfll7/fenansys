import * as Koa from 'koa'

const app = new Koa()

app.use((ctx: { body: string }) => {
  ctx.body = 'Hello world'
})

module.exports = app
