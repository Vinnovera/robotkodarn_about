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
    <section class="${renderStyle(opts)}">
      ${content}
      ${pattern(opts.theme.color)}
    </section>
  `
}

/**
 * Renders different content depending on page type.
 * @param {object} doc
 * @param {string} type Page type, i.e. 'homepage'
 */
const renderContent = (doc, opts) => {
  switch (opts.type) {
    case 'homepage':
      return html`
        <div class="Hero-content Hero-content--lg">
          ${heading(doc.data.title, 'homepage')}
          <p class="Hero-introduction Hero-introduction--lg">${doc.data.introduction}</p>
          <a href="${doc.data.link.uid}" class="${opts.theme.dark ? 'Button Button--inverted Button--md' : 'Button Button--md'}">${doc.data.link_title}</a>
        </div>
      `
    case 'article':
      return html`
      <div class="Hero-content">
        ${heading(doc.data.title)}
        <p class="Hero-introduction">${doc.data.introduction}</p>
        <div class="Hero-buttons">${renderButtons(doc.data.body, opts.theme.color)}</div>
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
 * Takes the type of page and returns appropriate CSS classes
 * @param {string} opts Type of page, including color theme
 */
const renderStyle = opts => {
  const style = opts.theme.dark
    ? `Hero Hero--${opts.type} u-colorWhite`
    : `Hero Hero--${opts.type}`

  return style
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
 * Component used when waiting for content to load
 * @param {object} opts Used when rendering content and deciding styling
 */
function loading (opts) {
  return html`
    <section class="${renderStyle(opts)}">
      <div class="u-widthL">
        ${heading.loading()}
        ${opts.type === 'article' || opts.type === 'contact'
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
        ${pattern(opts.theme.color)}
      </div>
    </section>
  `
}
