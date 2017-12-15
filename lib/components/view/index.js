const html = require('choo/html')
const navigation = require('./../navigation')
const error = require('./../error')
const footer = require('./../footer')

module.exports = createView

/**
 * Wrapping component that contain all those elements
 * that are a part of the main framework, i.e. navigation and footer.
 */
function createView (type, page) {
  return (state, emit) => {
    emit('page-change', type)

    let children

    if (state.error) {
      children = error(state)
    } else {
      try {
        children = page(state, emit)
      } catch (err) {
        children = error(Object.assign({ error: err }, state))
      }
    }

    const styles = state.menuOpen ? 'App--noscroll' : ''

    return html`
      <body class="${styles}">
        ${!state.error ? navigation(state, emit) : null}
        ${children}
        ${!state.error ? footer(state, emit, state.color) : null}
      </body>
    `
  }
}
