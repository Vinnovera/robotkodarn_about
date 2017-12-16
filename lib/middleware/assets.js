const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')
const browserify = require('browserify')
const chokidar = require('chokidar')
const postcss = require('postcss')
const watchifyMiddleware = require('watchify-middleware')

const readFile = promisify(fs.readFile)

module.exports = assets

/**
 * Compiles assets on request
 * @param {object} opts Options used when setting up a new browserify instance
 */
function assets (opts) {
  const bundler = browserify({
    debug: true,
    entries: `${opts.entry}.js`,
    basedir: opts.root
  })

  // Bundler for .env variables
  bundler.transform('localenvify')

  const watchify = watchifyMiddleware(bundler)

  // PostCSS configuration
  const cssBundle = postcss([
    require('postcss-import'),
    require('postcss-custom-properties'),
    require('postcss-custom-media')
  ])

  /**
   * Process and bundle CSS with configurations
   */
  const processCSS = () => {
    const file = resolve(opts.root, opts.entry + '.css')
    return readFile(file, 'utf8').then(css => {
      return cssBundle.process(css, { from: file, to: file })
    })
  }

  let deferred = processCSS()
  chokidar
    .watch('**/*.css', { cwd: opts.root, ignoreInitial: true })
    .on('all', () => { deferred = processCSS() })

  return async function (ctx, next) {
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
    } else if (ctx.path === '/index.css') {
      ctx.type = 'text/css'
      const result = await deferred
      ctx.body = result.css
    } else {
      return next()
    }
  }
}
