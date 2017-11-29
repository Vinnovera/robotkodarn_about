const html = require('choo/html')
const sheetify = require('sheetify')
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
            <p class="u-textM u-lineHeightM">${slice.primary.slogan}</p>
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
  return html`
    <section class="Hero">
      <div class="u-widthM">
        ${heading.loading()}
        ${shapes()}
      </div>
    </section>
  `
}
