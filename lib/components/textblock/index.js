const html = require('choo/html')
const asElement = require('prismic-element')
const { convertToAnchor } = require('../utils')
const { __ } = require('../../locale')

module.exports = textblock
module.exports.loading = loading

function textblock (content, expand, expandedSections = [], color) {
  const anchor = convertToAnchor(content.subtitle)
  const index = expandedSections.indexOf(anchor)

  const generateStyles = (name) => {
    if (index !== -1) {
      return `${name} ${name}--${color} ${name}--expanded`
    }
    return `${name} ${name}--${color}`
  }

  return html`
    <article class="Textblock">
      <h2>
        <button class="Textblock-button" id=${anchor} onclick=${expand}>
          ${content.subtitle}
          <svg class=${generateStyles('Textblock-carret')} xmlns="http://www.w3.org/2000/svg">
            <path  d="M0 2.3L2 0l5.5 4.7L12.9 0 15 2.3 7.5 8.8z" fill="currentColor" fill-rule="evenodd"/>
          </svg>
        </button>
      </h2>
      <div class=${generateStyles('Textblock-section')}>
        ${asElement(content.text)}
      </div>
    </article>
  `
}

function loading () {
  return html`
    <article class="Textblock">
      <h2 class="Textblock-button Textblock-button--loading">${__('Loading')}</h2>
      <p class="Textblock-section Textblock-section--loading">${__('Loading textblock text')}</p>
    </article>
  `
}
