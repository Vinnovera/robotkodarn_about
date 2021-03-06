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
      <meta name="viewport" content="width=device-width, initial-scale=1 viewport-fit=cover">
      <title>${state.title || __('Site title')}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/manifest.json">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#30095d">
      <meta name="apple-mobile-web-app-title" content="Robotkodarn">
      <meta name="application-name" content="Robotkodarn">
      <meta name="theme-color" content="#30095d">

      <meta property="og:url" content="${__('Site url')}" />
      <meta property="og:title" content="${state.title || __('Site title')}"/>
      <meta property="og:description" content="${__('Site description')}" />
      <meta property="og:image" content="${__('Site url') + 'og-image.png'}" />

      <link href="/index-${state.version}.css" rel="stylesheet">
      <script>
        (function () {
          document.documentElement.classList.add('has-js');
          window.initialState = ${JSON.stringify(state).replace(/\\n/g, '\\\n')}
        }())
      </script>
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find"></script>
      <script src="/index-${state.version}.js" async></script>
      <!-- Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GA_TRACKING_ID}');
      </script>
    </head>
    ${view}
    </html>
  `
}

/**
 * Simple minifier that removes whitespaces after new line,
 * using the awesomeness of tagged template literals.
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
