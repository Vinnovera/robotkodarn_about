const Router = require('koa-router')
const dedent = require('dedent')

const router = module.exports = new Router()

/**
 * Get info about contributors from CMS and make it available on state
 */
router.get('/humans.txt', async (ctx) => {
  const response = await ctx.api.getByUID('article', 'om-robotkodarn')

  // Get contributor information from team slice
  const team = response.data.body
    .filter(slice => slice.slice_type === 'team')
    .map(slice => {
      return slice.items.reduce((total, part) => {
        return total.concat(part.contributors_list
          .filter(item => total.indexOf(item.text) === -1)
          .map(item => item.text)
        )
      }, []).sort().join('\n')
    }).join('')

  // Type is set to text/plain since its a txt file
  ctx.type = 'text/plain'

  ctx.body = dedent(team)
})
