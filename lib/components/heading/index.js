const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = heading
module.exports.loading = loading

/**
 *
 * @param {object} title Title retrieved from CMS.
 */
function heading (title, type = 'article') {
  const styles = type === 'homepage' ? 'Heading Heading--lg' : 'Heading'

  return html`
    <header>
      <h1 class="${styles}">${asText(title)}</h1>
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
