module.exports = error

function error (state, emitter) {
  state.error = null

  emitter.on('error', err => {
    state.error = {
      message: err.message,
      stack: err.stack,
      status: err.status || 500,
      expose: err.expose || false
    }

    emitter.emit('render')
  })
}
