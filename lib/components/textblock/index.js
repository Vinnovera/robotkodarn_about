const html = require('choo/html')
const asElement = require('prismic-element')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')
const { convertToAnchor } = require('../utils')

module.exports = textblock
module.exports.loading = loading

function textblock (content, expand, expandedSections = []) {
  const anchor = convertToAnchor(content.subtitle)
  const index = expandedSections.indexOf(anchor)

  const generateStyles = (name) => {
    if (index !== -1) {
      return `${name} ${name}--expanded`
    }
    return name
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
    <article>
      <h2>${__('Loading')}</h2>
      <p>${__('Loading')}</p>
    </article>
  `
}
