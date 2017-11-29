module.exports = menu

function menu (state, emitter) {
  state.menuOpen = false

  emitter.on('toggle', () => {
    state.menuOpen = !state.menuOpen
    emitter.emit('render')
  })
}
