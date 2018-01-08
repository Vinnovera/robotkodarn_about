module.exports = articles

function articles (state, emitter) {
  // Initial state
  state.expanded = []

  /**
   * Add or remove element to list of expanded article sections if
   * user expand or collapse it.
   */
  emitter.on('toggle-section', id => {
    const index = state.expanded.indexOf(id)

    if (index === -1) {
      state.expanded.push(id)
    } else {
      state.expanded.splice(index, 1)
    }
    emitter.emit('render')
  })
}
