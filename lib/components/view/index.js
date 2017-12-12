const html = require('choo/html')
const navigation = require('./../navigation')
const footer = require('./../footer')

module.exports = view

/**
 * Wrapping component that contain all those elements
 * that are a part of the main framework, i.e. navigation and footer.
 */
function view (state, emit, opts, children) {
  const styles = state.menuOpen ? 'App--noscroll' : ''

  return html`
    <body class="${styles}">
      ${navigation(state, emit, opts)}
      ${children}
      ${footer(state, emit, opts.color)}
    </body>
  `
}
