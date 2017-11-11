let html = minify

if (process.env.NODE_ENV === 'development') {
  html = require('dedent')
}

module.exports = document

function document (view, state) {
  return html`
    <!doctype html>
    <html>
    <head>
      <meta charset="utf8">
      <script>window.initialState = ${JSON.stringify(state)}</script>
      <script src="/bundle.js" async></script>
    </head>
    ${view}
    </html>
  `
}

/**
 * Simple minifier that removes whitespaces after new line,
 * using the awesomeness of tagged template literals. 😻
 *
 * @param {array} strings All the strings in the html to be minified
 * @param {*} parts All the expressions used in the html
 */
function minify (strings, ...parts) {
  return strings.reduce((total, str, index) => {
    // Replaces whitespaces before/after new lines with empty string
    return total + (str + (parts[index] || '')).replace(/\n\s*/g, '')
  }, '')
}
