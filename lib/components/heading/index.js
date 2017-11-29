const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { __ } = require('../../locale')
// TODO: Require asElement when needed

module.exports = heading
module.exports.loading = loading

function heading (title) {
  return html`
    <header>
      <h1 class="u-textXL u-marginBottomM">${asText(title)}</h1>
    </header>
  `
}

function loading () {
  return html`
    <header>
      <h1 class="u-textXL u-marginBottomM">${__('Loading')}</h1>
    </header>
  `
}
