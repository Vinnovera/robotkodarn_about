const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { __ } = require('../locale')

module.exports = contact

function contact (state, emit) {
  const doc = state.pages.find(page => page.type === 'contact')

  if (!doc) {
    emit('pages:fetch', { single: 'contact' })
    return html`
      <body>
        <h1><em>${__('Loading')}</em></h1>
        <a href="./">Gå tillbaka hem</a>
      </body>
    `
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return html`
    <body>
      <h1>${asText(doc.data.title)}</h1>
      <a href="./">Gå tillbaka hem</a>
    </body>
  `
}
