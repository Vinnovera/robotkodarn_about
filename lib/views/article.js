const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { __ } = require('../locale')
const view = require('../components/view')

module.exports = article

function article (state, emit) {
  const route = state.href.substr(1) /* Remove / in beginning of string */
  const doc = state.pages.find(page => page.uid === route)

  if (!doc) {
    emit('pages:fetch', { article: route })
    return html`
      <body>
        <h1><em>${__('Loading')}</em></h1>
        <a href="./">Gå tillbaka hem</a>
      </body>
    `
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, html`
    <h1>${asText(doc.data.title)}</h1>
  `
  )
}
