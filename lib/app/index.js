const devtools = require('choo-devtools')
const choo = require('choo')
const createStore = require('./store')
const sheetify = require('sheetify')
sheetify('./index.css')

const app = module.exports = choo()

if (process.env.NODE_ENV === 'development') {
  // Exposes the choo instance on the window
  app.use(devtools())
}

app.use(createStore())

// TODO: Figure out if these really should be hardcoded.
app.route('/', require('../views/home'))
app.route('/sa-funkar-det', require('../views/article'))
app.route('/om-robotkodarn', require('../views/article'))
app.route('/sa-mots-malen', require('../views/article'))
app.route('/kontakt', require('../views/contact'))
app.route('/error', require('../views/error'))
app.route('*', require('../views/404'))

if (typeof window !== 'undefined') {
  // Start the application and mount it on the body
  app.mount('body')
}
