const html = require('choo/html')
const asElement = require('prismic-element')
const { convertToAnchor, modifiers, linkResolver, serialize } = require('../utils')
const { __ } = require('../../locale')

module.exports = textblock
module.exports.loading = loading

function textblock (content, expand, expandedSection, color) {
  const anchor = convertToAnchor(content.subtitle)
  const mods = {
    [color]: true,
    expanded: (anchor === expandedSection)
  }

  return html`
    <article class="Textblock">
      <h2>
        <button class="Textblock-button" id=${anchor} onclick=${expand}>
          ${content.subtitle}
          <svg class="${modifiers('Textblock-carret', mods)}">
            <path d="M0 2.3L2 0l5.5 4.7L12.9 0 15 2.3 7.5 8.8z" fill="currentColor" fill-rule="evenodd"/>
          </svg>
        </button>
      </h2>
      <div class="${modifiers('Textblock-section', mods)}">
        ${asElement(content.text, linkResolver, serialize('Textblock'))}
      </div>
    </article>
  `
}

function loading () {
  return html`
    <article class="Textblock">
      <h2 class="Textblock-button Textblock-button--loading">${__('Loading')}</h2>
      <p class="Textblock-section Textblock-section--loading">${__('Loading text')}</p>
    </article>
  `
}
