const html = require('choo/html')
const heading = require('../heading')
const pattern = require('../pattern')
const convertToAnchor = require('../../utils.js')
const sheetify = require('sheetify')
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
  if (type === 'homepage') {
    return doc.data.body.map(slice => {
      if (slice.slice_type === 'hero') {
        return html`
          <section class=${renderStyle(type)}>
              <div class="u-maxWidthM">
                ${heading(doc.data.title)}
                <p class="u-textM u-textBoldXL u-lineHeightM">${slice.primary.slogan}</p>
                <a href="${slice.primary.link.url}" class="Button">${slice.primary.link_text}</a>
              </div>
              ${pattern(type)}
           </section>
          `
      }
    })
  } else if (type === 'article') {
    return html`
      <section class=${renderStyle(type)}>
        ${heading(doc.data.title)}
        <p class="u-textM u-marginBottomL">${doc.data.introduction}</p>
        <div class="Hero-buttons">${renderButtons(doc.data.body)}</div>
        ${pattern(type)}
      </section>
    `
  }
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
const renderStyle = type => {
  return type === 'homepage' ? 'Hero Hero--homepage' : 'Hero Hero--article'
}

/**
 * Renders the anchor link used on medium and large viewports in Hero component.
 * @param {object} body
 */
const renderButtons = body => {
  return body.map(slice => {
    switch (slice.slice_type) {
      case 'text': return html`
          <a
            href="#${convertToAnchor(slice.primary.subtitle)}"
            onclick=${scrollToAnchor}
            class="Button Button--article"
          >
            ${slice.primary.subtitle}
          </a>
        `
      default: return null
    }
  })
}

/**
 * Takes target anchor link and scrolls it into view.
 * scrollIntoView is supported natively by Chrome and Firefox,
 * but polyfill is needed for Safari and Internet Explorer.
 *
 * TODO: Figure out what polyfills are needed to make this work in safari and i.e.
 * @param {object} event
 */
const scrollToAnchor = event => {
  const id = event.target.hash.replace(/#/g, '')
  const element = document.getElementById(id)

  element.scrollIntoView({ block: 'start', behavior: 'smooth' })
  event.preventDefault()
}
