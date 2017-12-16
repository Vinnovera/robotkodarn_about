const html = require('choo/html')
const navigation = require('../navigation')
const error = require('../error')
const footer = require('../footer')
const { modifiers } = require('../utils')

module.exports = createView

/**
 * Wrapping component that contain all those elements
 * that are a part of the main framework, i.e. navigation and footer.
 */
function createView (type, page) {
  return (state, emit) => {
    emit('page-change', type)

    let children
    let hasError = !!state.error

    if (hasError) {
      children = error(state)
    } else {
      try {
        children = page(state, emit)
      } catch (err) {
        hasError = true
        children = error(Object.assign({ error: err }, state))
      }
    }

    return html`
      <body class="${modifiers('App', { 'noscroll': state.menuOpen })}">
        ${!hasError ? navigation(state, emit) : null}
        ${children}
        ${!hasError ? footer(state, emit, state.color) : null}
      </body>
    `
  }
}
