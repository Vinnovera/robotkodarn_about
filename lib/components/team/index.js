const html = require('choo/html')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')
const { convertToAnchor } = require('../utils')

module.exports = team
module.exports.loading = loading

function team (content, expand, expandedSections = [], color) {
  const anchor = convertToAnchor(content.primary.title)
  const index = expandedSections.indexOf(anchor)

  const generateStyles = (name) => {
    if (index !== -1) {
      return `${name} ${name}--${color} ${name}--expanded`
    }
    return `${name} ${name}--${color}`
  }

  return html`
    <article class="Team">
      <h2>
        <button class="Team-button" id=${anchor} onclick=${expand}>
          ${content.primary.title}
          <svg class=${generateStyles('Team-carret')} xmlns="http://www.w3.org/2000/svg">
            <path  d="M0 2.3L2 0l5.5 4.7L12.9 0 15 2.3 7.5 8.8z" fill="currentColor" fill-rule="evenodd"/>
          </svg>
        </button>
      </h2>
      <div class=${generateStyles('Team-section')}>
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
      <h2 class="Team-button Team-button--loading">${__('Loading')}</h2>
      <p class="Team-section Team-section--loading">${__('Loading textblock text')}</p>
    </article>
  `
}
