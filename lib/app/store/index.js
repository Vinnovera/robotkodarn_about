
const menu = require('./menu')
const pages = require('./pages')
const sections = require('./sections')

/**
 * Gather all store items and combine them to one single store.
 */
module.exports = function () {
  return (state, emitter, app) => {
    menu(state, emitter)
    pages(state, emitter)
    sections(state, emitter)

    state.error = null

    emitter.on('error', err => {
      state.error = {
        message: err.message,
        stack: err.stack,
        status: err.status || 500,
        expose: err.expose || false
      }

      emitter.emit('render')
    })

    /**
     * Extends state with page props before rendering page.
     * Modifies app own state since app.toString() reassigning state on render
     */
    emitter.on('page-change', (pageType) => {
      app.state.pageType = pageType
      app.state.color = getColor(app.state.route)
    })
  }
}

/**
 * Get page specific color
 * @param {string} route
 */
const getColor = route => {
  switch (route) {
    case '/': return 'sun'
    case '/sa-funkar-det': return 'grass'
    case '/om-robotkodarn': return 'mauve'
    case '/sa-mots-malen': return 'ocean'
    case '/kontakt': return 'celestial'
    case '/error': return 'ocean'
    default: return 'ocean'
  }
}
