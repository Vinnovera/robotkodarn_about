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
  <section class=${renderStyle(type)}>

    <!-- When rendered on homepage -->
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

    <!-- When rendered on article page -->
    ${(type === 'article') ? html`
    <div class="u-widthM u-zIndexTwo">
      ${heading(doc.data.title)}
      <p class="Hero-introduction">${doc.data.introduction}</p>
      ${doc.data.body.map(slice => {
        switch (slice.slice_type) {
          case 'text': return html`
            ${slice.primary.subtitle}
          `
          default: return null
        }
      })}
    ` : null}

    ${pattern(type)}
  </section>
  `
}

function loading (type) {
  return html`
    <section class=${renderStyle(type)}>
      <div class="u-widthM">
        ${heading.loading()}
        ${pattern(type)}
      </div>
    </section>
  `
}

/**
 * Takes the type of page and returns appropriate CSS classes
 *
 * @param {string} type Can be 'homepage' or 'article'
 */
const renderStyle = (type) => {
  return type === 'homepage' ? 'Hero Hero--homepage' : 'Hero Hero--article'
}
