const html = require('choo/html')
const view = require('../components/view')

module.exports = error

function error (state, emit) {
  return view(state, emit, html`
    <h1>Error</h1>
    ${process.env.NODE_ENV === 'development' ? html`
      <pre>
        ${state.error.stack}
      </pre>
    ` : null}
  `)
}
