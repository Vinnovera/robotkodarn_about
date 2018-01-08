const articles = require('./articles')
const error = require('./error')
const pages = require('./pages')
const subscription = require('./subscription')

/**
 * Gather all store items and combine them to one single store.
 */
module.exports = function () {
  return (state, emitter, app) => {
    articles(state, emitter)
    error(state, emitter)
    pages(state, emitter)
    subscription(state, emitter)

    /**
     * Extends state with page props before rendering page.
     * Modifies app own state since app.toString() reassigning state on render
     */
    emitter.on('page-change', (pageType) => {
      app.state.pageType = pageType
      app.state.color = getColor(app.state.route)
    })

    emitter.on('render', alignHash)

    emitter.on('DOMContentLoaded', alignHash)

    /**
     * Scrolls hash into view,
     * used after DOMContentLoaded and render.
     */
    function alignHash () {
      const hash = window.location.hash.substr(1)

      if (hash && hash !== state.hash) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ block: 'start' })
        }
      }

      state.hash = hash
    }
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
    default: return 'ocean'
  }
}
