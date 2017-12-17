const html = require('choo/html')
const { convertToAnchor, modifiers } = require('../utils')
const { __ } = require('../../locale')

module.exports = team
module.exports.loading = loading

function team (content, expand, expandedSections = [], color) {
  const anchor = convertToAnchor(content.primary.title)
  const index = expandedSections.indexOf(anchor)
  const mods = {
    [color]: true,
    expanded: (index !== -1)
  }

  return html`
    <article class="Team">
      <h2>
        <button class="Team-button" id=${anchor} onclick=${expand}>
          ${content.primary.title}
          <svg class="${modifiers('Team-carret', mods)}">
            <path  d="M0 2.3L2 0l5.5 4.7L12.9 0 15 2.3 7.5 8.8z" fill="currentColor" fill-rule="evenodd"/>
          </svg>
        </button>
      </h2>
      <div class="${modifiers('Team-section', mods)}">
        ${content.items.map(item => {
          return html`
            <section>
              <h3>${item.from} – ${item.to}</h3>
              <p>${item.description}</p>
              <ul>
              ${item.contributors_list.map(contributor => {
                return html`
                  <li>${contributor.text}</li>
                `
              })}
            </section>
          `
        })}
      </div>
    </article>
  `
}

function loading () {
  return html`
    <article class="Team">
      <h2 class="${modifiers('Team-button', { loading: true })}">${__('Loading')}</h2>
      <p class="${modifiers('Team-section', { loading: true })}">${__('Loading text')}</p>
    </article>
  `
}
