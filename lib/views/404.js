const { __ } = require('./../locale')
const hero = require('../components/hero')
const html = require('choo/html')
const view = require('../components/view')

module.exports = notFound

function notFound (state, emit) {
  /*
   * Options used when fetching content
   * and deciding color scheme.
   */
  const opts = {
    theme: {
      color: 'ocean',
      dark: false
    },
    type: 'error'
  }

  const doc = {
    title: __('Page not found'),
    description: __('That page does not exist. Try again!')
  }

  return view(state, emit, opts, html`
    <div>
      ${hero(doc, opts)}
    </div>
  `)
}
