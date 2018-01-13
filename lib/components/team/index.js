const html = require('choo/html')
const { convertToId } = require('../utils')
const { __, __n } = require('../../locale')

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
                <h3 class="Team-cardtitle">${item.title}</h3>
                <p class="Team-description">
                  <span class="u-textWeightXL">
                    ${' ' + item.from + ' – ' + item.to + ' | '}
                  </span>
                  ${item.description}
                </p>
                ${getContributors(item.contributors_list)}
              </section>
            `
          })}
        </div>
      </div>
    </article>
  `
}

const getContributors = (list = []) => {
  if (!Array.isArray(list) || list.length === 0) {
    return
  }

  // If more than one member, use 'Project members'
  const intro = __n('Project member', 'Project members', list.length)

  // Get all contributor's names from list array
  const contributors = list.map(item => {
    return item.text
  })

  const lastItem = contributors[list.length - 1]

  /*
   * If only two items, return first item in array.
   * Else, join items and seperate them with a comma.
   */
  let str = contributors.length === 2
    ? contributors[0]
    : contributors.slice(0, list.length - 1).join(', ')

  return html`
    <p class="Team-list">
      <span class="u-textWeightXL">${intro + ': '}</span>
      ${list.length === 1 ? lastItem : `${str} ${__('And').toLowerCase()} ${lastItem}`}.
    </p>
  `
}
