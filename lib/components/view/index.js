const html = require('choo/html')
const Navigation = require('../navigation')
const error = require('../error')
const form = require('../form')
const footer = require('../footer')

module.exports = createView
const navigation = new Navigation()
/**
 * Wrapping component that contain all those elements
 * that are a part of the main framework, i.e. navigation and footer.
 */
function createView (type, page) {
  return (state, emit) => {
    emit('page-change', type)

    /**
     * Emits event with information about subscription when user
     * submits the newsletter form
     */
    const handleSubscription = data => {
      emit('subscribe', data)
    }

    let children
    let hasError = !!state.error

    if (hasError) {
      children = error(state)
    } else {
      try {
        children = page(state, emit)
      } catch (err) {
        hasError = true
        children = error(Object.assign({}, state, { error: err, pageType: 'error' }))
      }
    }

    return html`
      <body>
        ${!hasError ? navigation.render(state, emit) : null}
        ${children}
        ${!hasError ? form(state, handleSubscription) : null}
        ${!hasError ? footer(state, state.color) : null}
      </body>
    `
  }
}
