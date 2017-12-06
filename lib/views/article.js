const html = require('choo/html')
const { asText } = require('prismic-richtext')
const textblock = require('../components/textblock')
const view = require('../components/view')
const hero = require('../components/hero')

module.exports = article

function article (state, emit) {
  const pageType = 'article'
  const route = state.href.substr(1) // Remove slash in beginning of string
  const doc = state.pages.find(page => page.uid === route)

  if (!doc) {
    emit('pages:fetch', { article: route })
    return view(state, emit, pageType, hero.loading(pageType))
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  /**
   * Fires an event for expanding current section when a user
   * clicks on textblock title (small viewports only)
   */
  const expand = (event) => {
    console.log(event.target.id)
    emit('expand-section', event.target.id)
    event.preventDefault()
  }

  return view(state, emit, pageType, html`
    <div class="App-article">
      ${hero(doc, pageType)}
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
