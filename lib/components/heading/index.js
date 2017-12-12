const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { __ } = require('../../locale')

module.exports = heading
module.exports.loading = loading

/**
 *
 * @param {object} title Title retrieved from CMS.
 */
function heading (title) {
  return html`
    <header>
      <h1 class="u-textXL u-lineHeightM u-marginBottomS">${asText(title)}</h1>
    </header>
  `
}

/**
 * Component used when waiting for content to load
 * @param {object} opts Used when rendering content and deciding styling
 */
function loading () {
  return html`
    <header>
      <h1 class="u-textXL u-marginBottomS u-colorWhite u-backgroundWhite">
        ${__('Loading')}
      </h1>
    </header>
  `
}
