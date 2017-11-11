const html = require('choo/html')

module.exports = notFound

function notFound (state, emit) {
  return html`
    <body>
      <h1>Not Found</h1>
    </body>
  `
}
