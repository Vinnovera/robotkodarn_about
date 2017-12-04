const html = require('choo/html')
const asElement = require('prismic-element')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = textblock
module.exports.loading = loading

function textblock (content) {
  return html`
    <article class="Textblock">
      <h2 class="u-textUppercase u-textM" id=${content.subtitle}>${content.subtitle}</h2>
      ${asElement(content.text)}
    </article>
  `
}

function loading () {
  return html`
    <article>
      <h2>${__('Loading')}</h2>
      <p>${__('Loading')}</p>
    </article>
  `
}
