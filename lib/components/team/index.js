const html = require('choo/html')
const { convertToAnchor, modifiers } = require('../utils')
const { __ } = require('../../locale')

module.exports = team
module.exports.loading = loading

function team (content, color) {
  const anchor = convertToAnchor(content.primary.title)

  const mods = {
    [color]: true
  }

  return html`
    <article class="Team">
      <h2 class="Team-title" id="${anchor}">
        ${content.primary.title}
      </h2>
      <div class="${modifiers('Team-section', mods)}">
        ${content.items.map(item => {
          return html`
            <section>
              <h3 class="Team-heading3">${item.from} – ${item.to}</h3>
              <p class="Team-paragraph">${item.description}</p>
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
