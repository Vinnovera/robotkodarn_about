const compose = require('koa-compose')

// TODO: Figure out if these really should be hardcoded.
const routers = [
  require('./home'),
  require('./about'),
  require('./goals'),
  require('./how'),
  require('./contact'),
  require('./humans')
]

// Composes all routes into a single middleware to avoid repetitiveness
module.exports = compose(routers.reduce((routes, router) => {
  return routes.concat(router.routes(), router.allowedMethods())
}, []))
