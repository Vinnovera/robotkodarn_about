const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const compress = require('koa-compress')
const app = require('./lib/app')
const render = require('./lib/middleware/render')
const prismic = require('./lib/middleware/prismic')
const server = new Koa()

// Compiles assets on request during development
if (process.env.NODE_ENV === 'development') {
  server.use(require('./lib/middleware/assets')({
    entry: 'app/index',
    root: path.resolve(__dirname, 'lib')
  }))
}

// Serve static files from public folder
server.use(koaStatic('public', { maxage: (1000 * 60 * 60 * 24 * 365) }))

// Body parser middleware, needed to handle post requests
server.use(koaBody())

if (process.env.NODE_ENV !== 'development') {
  // Compress html
  server.use(compress())
}

// Render app once all the middlewares have had a go at the request
server.use(render(app))

server.use(prismic(process.env.PRISMIC_ENDPOINT))
server.use(require('./lib/routes'))

server.listen(process.env.PORT, () => {
  console.log(`🚂🚋🚋🚋  Server listening at: http://localhost:${process.env.PORT}`)
})
