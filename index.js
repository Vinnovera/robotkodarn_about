const Koa = require('koa')
const server = new Koa()
const app = require('./lib/app')
const render = require('./lib/middleware/render')
const prismic = require('./lib/middleware/prismic')
const path = require('path')

// Compiles assets on request during development
if (process.env.NODE_ENV === 'development') {
  server.use(require('./lib/middleware/assets')({
    entry: 'app/index',
    root: path.resolve(__dirname, 'lib')
  }))
}

// Serve static files from public folder
server.use(require('koa-static')('public'))

// Render app once all the middlewares have had a go at the request
server.use(render(app))

server.use(prismic(process.env.PRISMIC_ENDPOINT))
server.use(require('./lib/routes'))

server.listen(process.env.PORT, () => {
  console.log(`🚂🚋🚋🚋  Server listening at: http://localhost:${process.env.PORT}`)
})
