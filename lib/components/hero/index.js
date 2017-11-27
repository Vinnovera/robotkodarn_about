const html = require('choo/html')
const sheetify = require('sheetify')
const { __ } = require('../../locale')
const heading = require('../heading')
const shapes = require('../shapes')
sheetify('./index.css')

module.exports = hero
module.exports.loading = loading

function hero (doc) {
  return html`
    <section class="Hero">
      <div class="Hero-test"></div>
      ${heading(doc.data.title)}
      ${shapes()}
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
