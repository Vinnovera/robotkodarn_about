const html = require('choo/html')
const { __ } = require('./../locale')
const view = require('../components/view')
const hero = require('../components/hero')

module.exports = error

/**
 * Used for rendering error views
 * @param {object} state
 * @param {function} emit
 */
function error (state, emit) {
  /*
   * Options used when fetching content
   * and deciding color scheme.
   */
  const opts = {
    theme: {
      color: 'ocean',
      dark: true
    },
    type: 'error'
  }

  const doc = {
    title: __('Error'),
    description: __('Something went wrong. Please come back later.')
  }

  return view(state, emit, opts, html`
    <div>
      ${hero(doc, opts)}
      ${process.env.NODE_ENV === 'development'
        ? html` <pre class="u-paddingTopL u-paddingSidesL">${state.error.stack}</pre>`
        : null
      }
    </div>
    `
  )
}
