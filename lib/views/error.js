const html = require('choo/html')

module.exports = error

function error (state, emit) {
  return html`
    <body>
      <h1>Error</h1>
      ${process.env.NODE_ENV === 'development' ? html`
        <pre>
          ${state.error.stack}
        </pre>
      ` : null}
    </body>
  `
}
