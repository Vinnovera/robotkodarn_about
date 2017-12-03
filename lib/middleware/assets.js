const browserify = require('browserify')
const watchifyMiddleware = require('watchify-middleware')

module.exports = assets

/**
 * Compiles assets on request
 * @param {object} opts Options used when setting up a new browserify instance
 */
function assets (opts) {
  const bundler = browserify(Object.assign({
    debug: true
  }, opts))

  // Bundler for .env variables
  bundler.transform('localenvify')

  // CSS bundler for browserify, with plugins for using postcss
  bundler.transform('sheetify', { use: [
    [
      'sheetify-postcss', {
        plugins: [
          'postcss-import',
          'postcss-custom-properties',
          'postcss-custom-media'
        ]
      }
    ]
  ]})

  const watchify = watchifyMiddleware(bundler)

  return function (ctx, next) {
    if (ctx.path === '/index.js') {
      ctx.type = 'application/javascript'

      // Since Koa expects a promise
      return new Promise((resolve, reject) => {
        watchify(ctx.req, ctx.res)

        /*
         * The 'end' event is emitted when there is
         * no more data to be consumed from the stream.
         */
        ctx.res.on('end', resolve)

        /*
         * The 'error' event if the underlying stream is unable to
         * generate data, either due to internal failure or if
         * an invalid chunk of data is pushed.
         */
        ctx.res.on('error', reject)
      })
    } else {
      return next()
    }
  }
}
