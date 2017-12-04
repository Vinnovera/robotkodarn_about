const html = require('choo/html')
const sheetify = require('sheetify')
const heading = require('../heading')
const pattern = require('../pattern')
sheetify('./index.css')

module.exports = hero
module.exports.loading = loading

/**
 * Takes a prismic document and information about appearance, and then renders
 * the hero element.
 *
 * @param {object} doc  A Prismic document
 * @param {string} type Information about which page type is active (i.e. "hompage" or "article")
 */
function hero (doc, type) {
  return html`
  <section class="Hero">
    ${doc.data.body.map(slice => {
      if (slice.slice_type === 'hero') {
        return html`
          <div class="u-widthM u-zIndexTwo">
            ${heading(doc.data.title)}
            <p class="u-textM u-lineHeightM">${slice.primary.slogan}</p>
            <a href="${slice.primary.link.url}" class="Button">${slice.primary.link_text}</a>
          </div>
        `
      }
    })}
    ${pattern(type)}
  </section>
  `
}

function loading (type) {
  return html`
    <section class="Hero">
      <div class="u-widthM">
        ${heading.loading()}
        ${pattern(type)}
      </div>
    </section>
  `
}
