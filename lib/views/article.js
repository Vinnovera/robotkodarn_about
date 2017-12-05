const html = require('choo/html')
const { asText } = require('prismic-richtext')
const textblock = require('../components/textblock')
const view = require('../components/view')
const hero = require('../components/hero')

module.exports = article

function article (state, emit) {
  const route = state.href.substr(1) // Remove slash in beginning of string
  const doc = state.pages.find(page => page.uid === route)

  if (!doc) {
    emit('pages:fetch', { article: route })
    return view(state, emit, 'blue', hero.loading())
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, 'article', html`
    <div class="App-article">
      ${hero(doc, 'article')}
      ${doc.data.body.map(slice => {
        switch (slice.slice_type) {
          case 'text': return textblock(slice.primary)
          default: return null
        }
      })}
    </div>
  `
  )
}
