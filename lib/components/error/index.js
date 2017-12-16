const html = require('choo/html')
const hero = require('../hero')
const { __ } = require('../../locale')

module.exports = error

/**
 * Used for rendering error views
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
