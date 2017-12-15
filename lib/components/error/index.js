const html = require('choo/html')
const { __ } = require('./../../locale')
const hero = require('../hero')

module.exports = error

/**
 * Used for rendering error views
 * @param {object} state
 * @param {function} emit
 */
function error (state) {
  const doc = {
    title: __('Error'),
    description: __('Something went wrong. Please come back later.')
  }

  return html`
    <div>
      ${hero(doc, { color: state.color, pageType: state.pageType })}
      ${process.env.NODE_ENV === 'development'
        ? html` <pre class="u-paddingTopL u-paddingSidesL">${state.error.stack}</pre>`
        : null
      }
    </div>
    `
}
