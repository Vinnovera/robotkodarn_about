const hero = require('../components/hero')
const view = require('../components/view')
const { asText } = require('prismic-richtext')

module.exports = home

function home (state, emit) {
  const pageType = 'homepage'
  const doc = state.pages.find(page => page.type === pageType)

  if (!doc) {
    emit('pages:fetch', { single: pageType })
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, pageType, (doc ? hero(doc, pageType) : hero.loading(pageType)))
}
