const html = require('choo/html')
const asElement = require('prismic-element')
const { convertToAnchor, modifiers, linkResolver, serialize } = require('../utils')
const { __ } = require('../../locale')

module.exports = textblock
module.exports.loading = loading

function textblock (content, color, emit, expanded) {
  const anchor = convertToAnchor(content.subtitle)
  const index = expanded.indexOf(anchor)
  const mods = {
    [color]: true,
    expand: index !== -1
  }

  const expand = anchor => event => {
    emit('expand', anchor)
    event.preventDefault()
  }

  return html`
    <article class="Textblock">
      <h2 class="Textblock-title" id=${anchor}>
        ${content.subtitle}
      </h2>
      <div class="${modifiers('Textblock-section', mods)}">
        ${asElement(content.text, linkResolver, serialize('Textblock'))}
      </div>
      <div class="Textblock-divider">
        <button onclick=${expand(anchor)} class="Button Button--soft">
          ${!mods.expand
            ? __('Read more')
            : __('Show less')
          }</button>
      </div>
    </article>
  `
}

function loading () {
  return html`
    <article class="Textblock">
      <h2 class="Textblock-title Textblock-title--loading">${__('Loading')}</h2>
      <p class="Textblock-section Textblock-section--loading">${__('Loading text')}</p>
    </article>
  `
}
