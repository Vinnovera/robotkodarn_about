const Router = require('koa-router')
const dedent = require('dedent')

const router = module.exports = new Router()

/**
 * Get info about contributors from Prismic and make it available on state
 */
router.get('/humans.txt', async (ctx, next) => {
  const response = await ctx.api.getSingle('contributors')

  // Map information about name, role and personal website
  const contributors = response.data.contributors.map(contributor => {
    return `
    ${contributor.name}
    Role: ${contributor.role}
    Website: ${contributor.website.url ? contributor.website.url : ''}
    `
  }).join('')

  // Type is set to text/plain since its a txt file
  ctx.type = 'text/plain'

  ctx.body = dedent`${contributors}`
})
