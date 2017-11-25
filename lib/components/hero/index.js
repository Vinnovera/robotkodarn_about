const html = require('choo/html')
const sheetify = require('sheetify')
const { __ } = require('../../locale')
const heading = require('../heading')
sheetify('./index.css')

module.exports = hero
module.exports.loading = loading

function hero (doc) {
  return html`
    <section class="Hero">
      ${heading(doc.data.title)}
    </section>
  `
}

function loading () {
  return html`
    <section>
      <h1>${__('Loading')}</h1>
    </section>
  `
}
