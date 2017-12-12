const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * Get page 'sa-funkar-det' from CMS and make it available on state
 */
router.get('/sa-funkar-det', async (ctx, next) => {
  const response = await ctx.api.getByUID('article', 'om-robotkodarn')
  ctx.state.pages = [ response ]
  return next()
})
