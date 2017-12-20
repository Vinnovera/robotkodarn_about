const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { modifiers } = require('../utils')
const { __ } = require('../../locale')

module.exports = heading
module.exports.loading = loading

/**
 * Heading component, used on all pages in Hero
 *
 * @param {object} title Retrieved from CMS
 * @param {string} type Page type
 */
function heading (title, type = 'article') {
  return html`
    <header>
      <h1 class="${modifiers('Heading', { lg: type === 'lg' })}">${asText(title)}</h1>
    </header>
  `
}

/**
 * Displayed while waiting for content to load from CMS
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
