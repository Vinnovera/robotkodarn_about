const html = require('choo/html')
const { modifiers, convertToAnchor } = require('../utils')
const { __ } = require('../../locale')

module.exports = anchors
module.exports.loading = loading

/**
 * Anchors component, rendered on all article pages
 *
 * @param {object} doc  Document retrieved from the CMS
 * @param {object} opts Used when rendering content and deciding styling
 */
function anchors (doc, opts) {
  return html`
    <div class="${modifiers('Anchors', { [opts.color]: true })}">
      <ul class="Anchors-list">
        ${renderAnchors(doc.data.body, opts.color)}
      </ul>
    </div>
  `
}

/**
 * Render anchor links
 */
const renderAnchors = (body, color = 'celestial') => {
  return body.map(slice => {
    /* Exit early if there is no title on slice */
    if (!slice.primary.title) {
      return
    }

    const anchor = slice.slice_type === 'text' || slice.slice_type === 'team'

    if (anchor) {
      return html`
        <li class="${modifiers('Anchors-listitem', { [color]: true })}">
          <a href="#${convertToAnchor(slice.primary.title)}" class="${modifiers('Anchors-link', { [color]: true })}">
            ${slice.primary.title}
            <svg class="${modifiers('Anchors-arrow', { [color]: true })}" viewBox="0 0 13 22" width="13" height="22">
              <path d="M3.6 21.7l-3.3-3L7 11.3.3 3.6l3.3-3 9 10.6z" fill="currentColor" fill-rule="evenodd"/>
            </svg>
          </a>
        </li>
      `
    }
  })
}

/**
 * Displayed while waiting for content to load from CMS
 */
function loading (color) {
  return html`
    <div class="${modifiers('Anchors', { [color]: true })}">
      <ul class="Anchors-list">
        ${renderLoadItem(color)}
        ${renderLoadItem(color)}
        ${renderLoadItem(color)}
      </ul>
    </div>
  `
}

/**
 * Used as placeholder while waiting for list items
 * to be loaded.
 */
const renderLoadItem = color => {
  return html`
    <li class="${modifiers('Anchors-listitem', { [color]: true })}">
      <span class="Anchors-link u-loading">
        ${__('Loading')}
      </span>
    </li>
  `
}
