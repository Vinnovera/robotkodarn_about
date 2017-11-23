const compose = require('koa-compose')

const routers = [
  require('./contact'),
  require('./home'),
  require('./humans')
]

// Composes all routes into a single middleware to avoid repetitiveness
module.exports = compose(routers.reduce((routes, router) => {
  return routes.concat(router.routes(), router.allowedMethods())
}, []))
