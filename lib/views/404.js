const html = require('choo/html')
const { __ } = require('./../locale')
const view = require('../components/view')

module.exports = notFound

function notFound (state, emit) {
  return view(state, emit, html`<h1>${__('Page not found')}</h1>`)
}
