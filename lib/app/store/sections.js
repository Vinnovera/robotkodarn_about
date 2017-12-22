module.exports = sections

function sections (state, emitter) {
  state.expanded = []
  state.visibleOnLanding = []

  /**
   * Add or remove element to list of expanded sections if
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

  /**
   * Add homepage components to list of visible sections.
   * Triggered when element has been in viewport.
   */
  emitter.on('has-entered', element => {
    const index = state.visibleOnLanding.indexOf(element)

    if (index === -1) {
      state.visibleOnLanding.push(element)
    }

    emitter.emit('render')
  })
}
