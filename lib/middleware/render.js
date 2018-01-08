const document = require('../document')

module.exports = render

/**
 * Renders app once all the middlewares have had a go at the request.
 * @param {object} app The main app.
 */
function render (app) {
  return async function (ctx, next) {
    ctx.state = Object.assign(ctx.state, app.state, {
      version: process.env.npm_package_version,
      error: null
    })

    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate')

    if (ctx.accepts('html')) {
      ctx.append('Link', [
        `</index-${ctx.state.version}.js>: rel=preload; as=script`,
        `</index-${ctx.state.version}.css>: rel=preload; as=style`
      ])
    }

    try {
      // Let downstream middleware have go at the request
      await next()

      // Respect if downstream already has set ctx.body
      if (ctx.body) return

      // Determine format of return value (html or json)
      if (ctx.accepts('html')) {
        ctx.type = 'text/html'
        const html = app.toString(ctx.path, ctx.state)
        // Pick up changes made to app state during render
        Object.assign(ctx.state, app.state)
        ctx.body = document(html, ctx.state)
      } else {
        ctx.type = 'application/json'
        ctx.body = ctx.state
      }
    } catch (err) {
      // Return error page if something goes wrong
      ctx.type = 'text/html'

      ctx.state.error = {
        message: err.message,
        status: err.status || 500,
        expose: err.expose || false,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      }

      const html = app.toString('/error', ctx.state)
      // Pick up changes made to app state during render
      Object.assign(ctx.state, app.state)
      ctx.body = document(html, ctx.state)
    }
  }
}
