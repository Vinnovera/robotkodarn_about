const devtools = require('choo-devtools')
const choo = require('choo')

const app = module.exports = choo()

if (process.env.NODE_ENV === 'development') {
  // Exposes the choo instance on the window
  app.use(devtools())
}

/* TODO: Use store once up and running, i.e.
 * app.use(require('./store/count'))
 */
app.route('/', require('../views/home'))
app.route('/error', require('../views/error'))
app.route('*', require('../views/404'))

if (typeof window !== 'undefined') {
  // Start the application and mount it on the body
  app.mount('body')
}
