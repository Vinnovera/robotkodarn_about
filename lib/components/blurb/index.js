const html = require('choo/html')
const asElement = require('prismic-element')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = blurb
module.exports.loading = loading

function blurb (content) {
  const section = html`
    <section class="Blurb">
      <h2 class="Blurb-title">${content.title}</h2>
      ${asElement(content.text)}
    </section>
  `

  return section
}

function loading () {
  return html`
    <section>
      <h2>${__('Loading')}</h2>
      <p>${__('Loading')}</p>
    </section>
  `
}
