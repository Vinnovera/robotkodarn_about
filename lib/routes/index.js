const compose = require('koa-compose')
const Router = require('koa-router')

const router = new Router()

const routers = [
  router.get('/', async (ctx, next) => {
    ctx.state.pages.items.push(await ctx.api.getSingle('homepage'))
  }),
  router.get('/sa-funkar-det', async (ctx, next) => {
    ctx.state.pages.items.push(await ctx.api.getByUID('article', 'sa-funkar-det'))
  }),
  router.get('/om-robotkodarn', async (ctx, next) => {
    ctx.state.pages.items.push(await ctx.api.getByUID('article', 'om-robotkodarn'))
  }),
  router.get('/sa-mots-malen', async (ctx, next) => {
    ctx.state.pages.items.push(await ctx.api.getByUID('article', 'sa-mots-malen'))
  }),
  router.get('/kontakt', async (ctx, next) => {
    ctx.state.pages.items.push(await ctx.api.getSingle('contact'))
  }),
  require('./subscribe'),
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
  ctx.state.pages.items = await Promise.all([
    ctx.api.getSingle('contact'),
    ctx.api.getSingle('framework')
  ])
  return next()
}
