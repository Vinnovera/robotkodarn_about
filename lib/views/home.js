const hero = require('../components/hero')
const view = require('../components/view')
const { asText } = require('prismic-richtext')

module.exports = home

function home (state, emit) {
  const doc = state.pages.find(page => page.type === 'homepage')

  if (!doc) {
    emit('pages:fetch', { single: 'homepage' })
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, 'pink', (doc ? hero(doc, 'homepage') : hero.loading()))
}
