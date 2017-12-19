const html = require('choo/html')
const hero = require('../components/hero')
const createView = require('../components/view')

module.exports = createView('thanks', thanks)

/**
 * View rendered on confirmation thank you page
 *
 * @param {object} state
 * @param {function} emit
 */
function thanks (state, emit) {
  const framework = state.pages.find(page => page.type === 'framework')

  const doc = {
    title: framework.data.confirmation_title,
    description: framework.data.confirmation_description
  }

  return html`
    <div>
      ${hero(doc, { color: state.color, pageType: state.pageType })}
    </div>
  `
}
