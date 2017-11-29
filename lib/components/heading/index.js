const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { __ } = require('../../locale')
// TODO: Require asElement when needed

module.exports = heading
module.exports.loading = loading

function heading (title) {
  return html`
    <heading>
      <h1 class="u-textXL">${asText(title)}</h1>
    </heading>
  `
}

function loading () {
  return html`
    <heading>
      <h1 class="u-textXL">${__('Loading')}</h1>
    </heading>
  `
}
