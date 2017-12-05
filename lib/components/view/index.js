const html = require('choo/html')
const navigation = require('./../navigation')

module.exports = view

/**
 * Wrapping component that contain all those elements
 * that are a part of the main framework, i.e. navigation and footer.
 */
function view (state, emit, type = 'homepage', children) {
  return html`
    <body>
      ${navigation(state, emit, type)}
      ${children}
    </body>
  `
}
