const browserify = require('browserify')

module.exports = assets

/**
 * Compiles assets on request
 * @param {object} opts Options used when setting up a new browserify instance
 */
function assets (opts) {
  const client = browserify(Object.assign({ debug: true }, opts))

  return function (ctx, next) {
    if (ctx.path === '/bundle.js') {
      ctx.type = 'application/javascript'
      ctx.body = client.bundle()
    } else {
      return next()
    }
  }
}
