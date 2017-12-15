const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * Get homepage from CMS and make it available on state
 */
router.get('/', async (ctx, next) => {
  ctx.state.pages.push(await ctx.api.getSingle('homepage'))
  return next()
})
