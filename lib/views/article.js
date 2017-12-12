const html = require('choo/html')
const { asText } = require('prismic-richtext')
const textblock = require('../components/textblock')
const view = require('../components/view')
const hero = require('../components/hero')

module.exports = article

function article (state, emit) {
  const route = state.href.substr(1) // Remove slash in beginning of string
  const doc = state.pages.find(page => page.uid === route)

  /**
   * Options used when fetching content
   * and deciding color scheme.
   */
  const opts = {
    color: setColor(route),
    type: 'article'
  }

  if (!doc) {
    emit('pages:fetch', { article: route })
    return view(state, emit, opts, hero.loading(opts))
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  /**
   * Fires an event for expanding current section when a user
   * clicks on textblock title (small viewports only)
   */
  const expand = (event) => {
    emit('expand-section', event.target.id)
    event.preventDefault()
  }

  return view(state, emit, opts, html`
    <div class="App App--left">
      ${hero(doc, opts)}
      ${doc.data.body.map(slice => {
        switch (slice.slice_type) {
          case 'text': return textblock(slice.primary, expand, state.expandedSections)
          default: return null
        }
      })}
    </div>
  `
  )
}

/**
 * Sets color scheme on a page
 * @param {string} route The current page
 */
const setColor = (route) => {
  switch (route) {
    case 'sa-funkar-det': return 'gagarin'
    case 'om-robotkodarn': return 'purple'
    case 'sa-mots-malen': return 'green'
    default: return null
  }
}
