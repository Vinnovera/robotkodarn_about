const html = require('choo/html')
const { asText } = require('prismic-richtext')

module.exports = contact

function contact (state, emit) {
  console.log(state)
  const doc = state.pages.find(page => page.type === 'contact')
  return html`
    <body>
      <h1>${asText(doc.data.title)}</h1>
      <a href="./">Gå tillbaka hem</a>
    </body>
  `
}
