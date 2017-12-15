const { __ } = require('./../locale')
const hero = require('../components/hero')
const html = require('choo/html')
const createView = require('../components/view')

module.exports = createView('404', notFound)

function notFound (state, emit) {
  const doc = {
    title: __('Page not found'),
    description: __('That page does not exist. Try again!')
  }

  return html`
    <div>
      ${hero(doc, { color: state.color, pageType: state.pageType })}
    </div>
  `
}
