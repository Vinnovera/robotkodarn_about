module.exports = menu

function menu (state, emitter) {
  // Initial state
  state.menuOpen = false

  emitter.on('toggle-menu', () => {
    state.menuOpen = !state.menuOpen
    emitter.emit('render')
  })
}
