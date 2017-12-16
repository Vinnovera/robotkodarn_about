const dedent = require('dedent')
const { __ } = require('./locale')

const html = process.env.NODE_ENV === 'development' ? dedent : minify

module.exports = document

function document (view, state) {
  return html`
    <!doctype html>
    <html lang="sv">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${state.title || __('Site title')}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/manifest.json">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fe5d4b">
      <meta name="apple-mobile-web-app-title" content="Robotkodarn">
      <meta name="application-name" content="Robotkodarn">
      <meta name="theme-color" content="#ffffff">
      <link href="/index-${state.version}.css" rel="stylesheet">
      <script>window.initialState = ${JSON.stringify(state).replace(/\\n/g, '\\\n')}</script>
      <script src="/index-${state.version}.js" async></script>
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
