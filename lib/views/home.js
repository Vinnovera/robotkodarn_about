const html = require('choo/html')
const heading = require('../components/heading')
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
      ${doc ? heading(doc.data.title) : heading.loading()}
      <a href="./contact">Till kontaktsidan</a>
    </body>
  `
}
