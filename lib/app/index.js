const choo = require('choo')
const createStore = require('./store')

const app = module.exports = choo()

if (process.env.NODE_ENV === 'development') {
  app.use(require('choo-devtools')())
}

app.use(createStore())

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
