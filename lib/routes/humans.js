const Router = require('koa-router')
const dedent = require('dedent')

const router = module.exports = new Router()

/**
 * Get info about contributors from Prismic and make it available on state
 */
router.get('/humans.txt', async (ctx, next) => {
  const response = await ctx.api.getByUID('article', 'om-robotkodarn')

  // Get contributor information from team slice
  const team = response.data.body.map(slice => {
    if (slice.slice_type !== 'team') {
      return
    }

    const contributors = []

    // Map information about name, role and personal website
    slice.items.forEach(contributor => {
      contributors.push(`
        ${contributor.name}
        Role: ${contributor.role}
        ${contributor.website ? `Website: ${contributor.website}` : ''}
      `)
    })
    return contributors.join('')
  }).join('')

  // Type is set to text/plain since its a txt file
  ctx.type = 'text/plain'

  ctx.body = dedent`${team}`
})
