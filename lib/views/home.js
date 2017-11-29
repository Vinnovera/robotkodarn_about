const html = require('choo/html')
const hero = require('../components/hero')
const navigation = require('../components/navigation')
const { asText } = require('prismic-richtext')
// TODO: Require asElement when needed

module.exports = home

function home (state, emit) {
  const doc = state.pages.find(page => page.type === 'homepage')

  if (!doc) {
    emit('pages:fetch', { single: 'homepage' })
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return html`
    <body>
      ${navigation(state, emit)}
      ${doc ? hero(doc) : hero.loading()}
    </body>
  `
}
