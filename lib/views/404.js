const { __ } = require('./../locale')
const hero = require('../components/hero')
const html = require('choo/html')
const createView = require('../components/view')

module.exports = createView('error', notFound)

/**
 * View rendered on 404 pages
 *
 * @param {object} state
 * @param {function} emit
 */
function notFound (state, emit) {
  const doc = {
    title: __('Page not found'),
    description: __('That page does not exist. Try again!')
  }

  return html`
    <div class="App">
      ${hero(doc, { color: state.color, pageType: state.pageType })}
    </div>
  `
}
