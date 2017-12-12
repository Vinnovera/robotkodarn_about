const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * Get homepage from CMS and make it available on state
 */
router.get('/', async (ctx, next) => {
  const response = await ctx.api.getSingle('homepage')
  ctx.state.pages = [ response ]
  return next()
})
