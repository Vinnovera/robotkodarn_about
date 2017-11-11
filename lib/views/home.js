const html = require('choo/html')
const { asText } = require('prismic-richtext')
// TODO: Require asElement when needed

module.exports = home

function home (state, emit) {
  const doc = state.pages.find(page => page.type === 'homepage')
  return html`
    <body>
      <h1>${asText(doc.data.title)}</h1>
    </body>
  `
}
