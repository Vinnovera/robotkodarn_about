const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { modifiers } = require('../utils')
const { __ } = require('../../locale')

module.exports = heading
module.exports.loading = loading

/**
 *
 * @param {object} title Title retrieved from CMS.
 */
function heading (title, type = 'article') {
  return html`
    <header>
      <h1 class="${modifiers('Heading', {lg: type === 'homepage'})}">${asText(title)}</h1>
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
      <h1 class="Heading Heading--loading">
        ${__('Loading')}
      </h1>
    </header>
  `
}
