module.exports = menu

function menu (state, emitter) {
  state.menuOpen = false

  emitter.on('toggle-menu', () => {
    state.menuOpen = !state.menuOpen
    emitter.emit('render')
  })
}
