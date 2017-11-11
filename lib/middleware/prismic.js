const Prismic = require('prismic-javascript')

module.exports = prismic

/**
 * Makes Prismic api available on ctx
 * @param {string} endpoint
 */
function prismic (endpoint) {
  return async function (ctx, next) {
    ctx.api = await Prismic.api(endpoint)
    return next()
  }
}
