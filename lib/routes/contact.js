const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * Get Contact Page from Prismic and make it available on state
 */
router.get('/kontakt', async (ctx, next) => {
  const response = await ctx.api.getSingle('contact')
  ctx.state.pages = [ response ]
  return next()
})
