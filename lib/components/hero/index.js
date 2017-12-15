const html = require('choo/html')
const heading = require('../heading')
const { __ } = require('../../locale')
const pattern = require('../pattern')
const { convertToAnchor, scrollToAnchor } = require('../utils')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = hero
module.exports.loading = loading

/**
 * Takes a document from CMS and information about appearance,
 * and then renders the hero element.
 * @param {object} doc  A document retrieved from the CMS
 * @param {object} opts Used when rendering content and deciding styling
 */
function hero (doc, opts) {
  let content = renderContent(doc, opts)

  return html`
    <section class="Hero Hero--${opts.pageType}">
      ${content}
      ${pattern(opts.color)}
    </section>
  `
}

/**
 * Renders different content depending on page type.
 * @param {object} doc
 * @param {object} opts Page type, i.e. 'homepage'
 */
const renderContent = (doc, opts) => {
  switch (opts.pageType) {
    case 'homepage':
      return html`
        <div class="Hero-content Hero-content--lg">
          ${heading(doc.data.title, 'homepage')}
          <p class="Hero-introduction Hero-introduction--lg">${doc.data.introduction}</p>
        </div>
      `
    case 'article':
      return html`
      <div class="Hero-content">
        ${heading(doc.data.title)}
        <p class="Hero-introduction">${doc.data.introduction}</p>
        <div class="Hero-buttons">${renderButtons(doc.data.body, opts.color)}</div>
      </div>
      `
    case 'error':
      return html`
        <div class="Hero-content">
          <header>
            <h1 class="u-textXL u-marginBottomS">${doc.title}</h1>
          </header>
        <p class="Hero-introduction">${doc.description}</p>
        </div>
      `
    case 'contact':
      return html`
        <div class="Hero-content">
          ${heading(doc.data.title)}
          <p class="Hero-introduction">${doc.data.introduction}</p>
        </div>
      `
    default: return null
  }
}

/**
 * Renders the anchor link used on medium and large viewports in Hero component.
 * @param {object} body
 */
const renderButtons = (body, color = 'celestial') => {
  return body.map(slice => {
    switch (slice.slice_type) {
      case 'text': return html`
          <a
            href="#${convertToAnchor(slice.primary.subtitle)}"
            onclick=${scrollToAnchor}
            class="Button Button--article Button--sm Button--${color}"
          >
            ${slice.primary.subtitle}
          </a>
        `
      default: return null
    }
  })
}

/**
 * Component used when waiting for content to load.
 */
function loading (opts) {
  return html`
    <section class="Hero Hero--${opts.pageType}">
      <div class="u-widthL">
        ${heading.loading()}
        ${opts.pageType === 'article' || opts.pageType === 'contact'
          ? html`
            <p class="Hero-introduction Hero-introduction--loading u-heightL">
              ${__('Loading introduction text')}
            </p>
          `
          : html`
            <div>
              <p class="Hero-introduction Hero-introduction--loading">
                ${__('Loading introduction text')}
              </p>
              <div class="Button Button--loading">${__('Loading button')}</div>
            </div>
          `
        }
        ${pattern(opts.color)}
      </div>
    </section>
  `
}
