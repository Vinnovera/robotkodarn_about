const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * Get page 'sa-mots-malen' from Prismic and make it available on state
 */
router.get('/sa-mots-malen', async (ctx, next) => {
  ctx.state.pages.push(await ctx.api.getByUID('article', 'sa-mots-malen'))
  return next()
})
