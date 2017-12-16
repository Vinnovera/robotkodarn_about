const html = require('choo/html')
const heading = require('../heading')
const pattern = require('../pattern')
const { modifiers, convertToAnchor, scrollToAnchor } = require('../utils')
const { __ } = require('../../locale')

module.exports = hero
module.exports.loading = loading

/**
 * Hero component, displayed on all pages
 *
 * @param {object} doc  Document retrieved from the CMS
 * @param {object} opts Used when rendering content and deciding styling
 */
function hero (doc, opts) {
  let content = renderContent(doc, opts)

  return html`
    <section class="${modifiers('Hero', { [opts.pageType]: true })}">
      ${content}
      ${pattern(opts.color)}
    </section>
  `
}

/**
 * Renders different content depending on page type.
 */
const renderContent = (doc, opts) => {
  switch (opts.pageType) {
    case 'homepage':
      return html`
        <div class="${modifiers('Hero-content', { lg: true })}">
          ${heading(doc.data.title, 'homepage')}
          <p class="${modifiers('Hero-introduction', { lg: true })}">${doc.data.introduction}</p>
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
 * Render anchor links in article
 */
const renderButtons = (body, color = 'celestial') => {
  return body.map(slice => {
    switch (slice.slice_type) {
      case 'text': return html`
          <a
            href="#${convertToAnchor(slice.primary.subtitle)}"
            onclick=${scrollToAnchor}
            class="${modifiers('Button', { article: true, sm: true, [color]: true })}"
          >
            ${slice.primary.subtitle}
          </a>
        `
      default: return null
    }
  })
}

/**
 * Displayed while waiting for content to load from CMS
 */
function loading (opts) {
  const buttonModifiers = { article: true, loading: true }
  const button = () => html`
    <div class="${modifiers('Button', buttonModifiers)}">${__('Loading button')}</div>
  `

  return html`
    <section class="Hero Hero--${opts.pageType}">
      <div class="u-widthL">
        ${heading.loading()}
        ${opts.pageType === 'article' || opts.pageType === 'contact'
          ? html`
            <div>
              <p class="${modifiers('Hero-introduction', { loading: true })}">
                ${__('Loading introduction text')}
              </p>
              ${button()}
              ${button()}
              ${button()}
            </div>
          `
          : html`
            <p class="${modifiers('Hero-introduction', { loading: true })}">
              ${__('Loading introduction text')}
            </p>
          `
        }
        ${pattern(opts.color, loading)}
      </div>
    </section>
  `
}
