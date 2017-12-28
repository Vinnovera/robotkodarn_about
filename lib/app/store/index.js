const error = require('./error')
const menu = require('./menu')
const pages = require('./pages')
const articles = require('./articles')

/**
 * Gather all store items and combine them to one single store.
 */
module.exports = function () {
  return (state, emitter, app) => {
    menu(state, emitter)
    pages(state, emitter)
    articles(state, emitter)
    error(state, emitter)

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
    case '/': return 'celestial'
    case '/sa-funkar-det': return 'grass'
    case '/om-robotkodarn': return 'autumn'
    case '/sa-mots-malen': return 'ocean'
    case '/kontakt': return 'mauve'
    case '/error': return 'ocean'
    case '/tack': return 'ocean'
    default: return 'ocean'
  }
}
