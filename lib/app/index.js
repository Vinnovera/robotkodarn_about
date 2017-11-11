const devtools = require('choo-devtools')
const choo = require('choo')

const app = module.exports = choo()

if (process.env.NODE_ENV === 'development') {
  // Exposes the choo instance on the window
  app.use(devtools())
}

app.use(require('./store/pages'))
app.route('/', require('../views/home'))
app.route('/contact', require('../views/contact'))
app.route('/error', require('../views/error'))
app.route('*', require('../views/404'))

if (typeof window !== 'undefined') {
  // Start the application and mount it on the body
  app.mount('body')
}
