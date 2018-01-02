const html = require('choo/html')
const heading = require('../heading')
const anchors = require('../anchors')
const pattern = require('../pattern')
const { modifiers } = require('../utils')
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
  const content = renderContent(doc, opts)

  return html`
    <div class="u-flexWrapper">
      <section class="${modifiers('Hero', { [opts.pageType]: true })}">
        ${content}
        ${pattern(opts.color)}
      </section>
    </div>
  `
}

/**
 * Displayed while waiting for content to load from CMS
 */
function loading (opts) {
  const content = renderContent({}, opts, true)

  return html`
    <div class="u-flexWrapper">
      <section class="${modifiers('Hero', { [opts.pageType]: true })}">
        ${content}
        ${pattern(opts.color)}
      </section>
    </div>
  `
}

/**
 * Renders different content depending on page type.
 */
const renderContent = (doc, opts, isLoading = false) => {
  switch (opts.pageType) {
    case 'homepage':
      return html`
        <div class="${modifiers('Hero-content', { [opts.pageType]: true })}">
          ${isLoading ? heading.loading() : heading(doc.data.title, 'home')}
          ${isLoading ? introductionLoading() : html`
            <p class="${modifiers('Hero-introduction', { lg: true })}">${doc.data.introduction}</p>
          `}
        </div>
      `
    case 'article':
      return html`
        <div class="${modifiers('Hero-content', { [opts.pageType]: true })}">
          <div class="Hero-main">
            ${isLoading ? heading.loading() : heading(doc.data.title, 'article')}
            ${isLoading ? introductionLoading('article') : html`
              <p class="Hero-introduction">${doc.data.introduction}</p>
            `}
          </div>
          ${isLoading ? anchors.loading(opts.color) : anchors(doc, { color: opts.color })}
        </div>
      `
    case 'error':
      return html`
        <div class="Hero-content">
          ${isLoading ? heading.loading() : html`
            <header>
              <h1 class="u-textXL u-marginBottomS">${doc.title}</h1>
            </header>
          `}
          <p class="Hero-introduction u-marginAuto">
            ${isLoading ? __('Loading text') : doc.description}
          </p>
        </div>
      `
    case 'thanks':
      return html`
        <div class="Hero-content">
          ${isLoading ? heading.loading() : html`
            <header>
              <h1 class="u-textXL u-marginBottomS">${doc.title}</h1>
            </header>
          `}
          <p class="Hero-introduction u-marginAuto">
            ${isLoading ? __('Loading text') : doc.description}
          </p>
        </div>
      `
    case 'contact':
      return html`
        <div class="Hero-content">
        ${isLoading ? heading.loading() : heading(doc.data.title, 'contact')}
        ${isLoading ? introductionLoading() : html`
          <p class="Hero-introduction">${doc.data.introduction}</p>
        `}
        </div>
      `
    default: return null
  }
}

const introductionLoading = (type = '') => {
  return html`
  <p class="Hero-introduction u-loadingTransparent ${type === 'article' ? 'u-heightS' : null}">
    ${__('Loading text')}
  </p>`
}
