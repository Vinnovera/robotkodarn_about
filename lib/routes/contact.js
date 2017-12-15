const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * Get Contact Page from Prismic and make it available on state
 */
router.get('/kontakt', async (ctx, next) => {
  ctx.state.pages.push(await ctx.api.getSingle('contact'))
  return next()
})
