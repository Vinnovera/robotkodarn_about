const compose = require('koa-compose')

const routers = [
  require('./home')
]

// Composes all routes into a single middleware to avoid repetitiveness
module.exports = compose(routers.reduce((routes, router) => {
  return routes.concat(router.routes(), router.allowedMethods())
}, []))
