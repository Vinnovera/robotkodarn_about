const document = require('../document')

module.exports = render

/**
 * Renders app once all the middlewares have had a go
 * at the request.
 * @param {object} app The main app.
 */
function render (app) {
  return async function (ctx, next) {
    ctx.state = Object.assign(ctx.state, app.state, {
      version: process.env.npm_package_version,
      error: null
    })

    try {
      // Let downstream middleware have go at the request
      await next()
      // Determine format of return value (html or json)
      if (ctx.accepts('html')) {
        ctx.type = 'text/html'
        const html = app.toString(ctx.path, ctx.state)
        ctx.state.title = app.state.title
        ctx.body = document(html, ctx.state)
      } else {
        ctx.type = 'application/json'
        ctx.body = ctx.state
      }
    } catch (err) {
      // Return error page if something goes wrong
      ctx.type = 'text/html'
      const html = app.toString('/error', { error: err })
      ctx.state.title = app.state.title
      ctx.body = document(html, ctx.state)
    }
  }
}
