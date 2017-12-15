const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * Get page 'om-robotkodarn' from Prismic and make it available on state
 */
router.get('/om-robotkodarn', async (ctx, next) => {
  ctx.state.pages.push(await ctx.api.getByUID('article', 'om-robotkodarn'))
  return next()
})
