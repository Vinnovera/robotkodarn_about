const html = require('choo/html')
const { __ } = require('./../locale')

module.exports = notFound

function notFound (state, emit) {
  return html`
    <body>
      <h1>${__('Page not found')}</h1>
    </body>
  `
}
