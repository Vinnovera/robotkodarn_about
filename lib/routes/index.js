const compose = require('koa-compose')

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
}, [ prerequisites ]))

/**
 * Before getting the requested route, also get documents necessary in
 * header and footer of every page.
 */
async function prerequisites (ctx, next) {
  ctx.state.pages = await Promise.all([
    ctx.api.getSingle('contact'),
    ctx.api.getSingle('framework')
  ])
  return next()
}
