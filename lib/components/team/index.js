const html = require('choo/html')
const { modifiers, convertToId } = require('../utils')

module.exports = team

function team (color, slice) {
  const anchor = convertToId(slice.primary.title)

  return html`
    <article class="Team">
      <div class="Team-content">
        <h2 class="Team-title" id=${anchor}>${slice.primary.title}</h2>
        <div class="Team-cards">
          ${slice.items.map(item => {
            return html`
              <section class="Team-card">
                <p class="u-textXS u-textWeightM u-fontFamilySans">
                  <span class="${modifiers('Team-date', { [color]: true })}">
                    ${' ' + item.from + ' – ' + item.to + ' | '}
                  </span>
                  ${item.description}
                </p>
                <ul class="Team-list">
                  ${item.contributors_list.map(contributor => html`
                    <li class="u-fontFamilySans u-textWeightM u-textXS u-lineHeightL">${contributor.text}</li>
                  `)}
                </ul>
              </section>
            `
          })}
        </div>
      </div>
    </article>
  `
}
