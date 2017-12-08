const html = require('choo/html')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = testimonial
module.exports.loading = loading

function testimonial (content) {
  return html`
    <section class="Testimonial">
      <p class="Testimonial-quote">${content.quote}</p>
    </section>
  `
}

function loading () {
  return html`
    <section>
      <h2>${__('Loading')}</h2>
      <p>${__('Loading')}</p>
    </section>
  `
}
