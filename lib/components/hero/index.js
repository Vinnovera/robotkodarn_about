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
    ${doc.data.body.map(slice => {
      if (slice.slice_type === 'hero') {
        return html`
          <div class="u-widthM">
            ${heading(doc.data.title)}
            <p class="u-textM">${slice.primary.slogan}</p>
            <a href="${slice.primary.link.url}" class="Button">${slice.primary.link_text}</a>
          </div>
        `
      }
    })}
    ${shapes()}
  </section>
  `
}

function loading () {
  console.log('yo')
  return html`
    <section>
      <h1>${__('Loading')}</h1>
        ${shapes()}
    </section>
  `
}
