const html = require('choo/html')
const heading = require('../heading')
const pattern = require('../pattern')
const { convertToAnchor } = require('../utils')
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
 * @param {string} color I.e. snow, used to style background pattern
 */
function hero (doc, type, color) {
  if (type === 'homepage') {
    return html`
      <section class="${renderStyle(type)}">
        <div class="u-widthL">
          ${heading(doc.data.title)}
          <p class="Hero-introduction">${doc.data.introduction}</p>
          <a href="${doc.data.link.uid}" class="Button">${doc.data.link_title}</a>
        </div>
        ${pattern(color)}
      </section>
      `
  } else if (type === 'article') {
    return html`
      <section class="${renderStyle(type)}">
        <div class="Hero-content">
          ${heading(doc.data.title)}
          <p class="Hero-introduction">${doc.data.introduction}</p>
          <div class="Hero-buttons">${renderButtons(doc.data.body)}</div>
        </div>
        ${pattern(color)}
      </section>
    `
  }
}

function loading (type, color) {
  return html`
    <section class="${renderStyle(type)}">
      <div class="u-widthM">
        ${heading.loading()}
        ${pattern(color)}
      </div>
    </section>
  `
}

/**
 * Takes the type of page and returns appropriate CSS classes
 *
 * @param {string} type Can be 'homepage' or 'article'
 */
const renderStyle = color => {
  return `Hero Hero--${color}`
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
            class="Button Button--square Button--azure"
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
