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

    emitter.on('DOMContentLoaded', () => {
      alignHash()

      // Collect documents not yet available on state
      const missing = missingDocs(app.state.pages.items)

      if (missing) {
        emitter.emit('pages:fetch', missing)
      }
    })

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

/**
 * Checks if there are any documents that are not yet available on state
 * and returns an array of ID's that are missing.
 * @param {array} docs
 */
const missingDocs = docs => {
  const framework = docs.find(doc => doc.type === 'framework')

  /*
   * The pages in navigation are the ones that need to be available
   * in state
   */
  const needed = framework.data.navigation.map(page => {
    return page.link.id
  })

  // Filter those that are missing
  const missing = needed.filter(id => !exists(id, docs))

  if (missing.length !== 0) {
    return missing
  }
}

/**
 * Checks if an ID exists in a list
 * @param {string} id The id of the document
 * @param {array} list The list to be checked
 */
const exists = (id, list) => {
  return list.find(item => item.id === id)
}
