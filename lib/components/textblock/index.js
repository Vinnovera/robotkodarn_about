const html = require('choo/html')
const asElement = require('prismic-element')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')
const convertToAnchor = require('../../utils.js')

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
      <button class="Textblock-button" id=${anchor} onclick=${expand}>
        <h2 class="Textblock-title">${content.subtitle}</h2>
        <svg class=${generateStyles('Textblock-carret')} xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3.3L2.9 0l7.6 6.5L18.1 0 21 3.3l-10.5 9z" fill="currentColor" fill-rule="evenodd"/>
        </svg>
      </button>
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
