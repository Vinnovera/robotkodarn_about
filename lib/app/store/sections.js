module.exports = sections

function sections (state, emitter) {
  state.expandedSection = []
  state.visibleOnLanding = []

  /**
   * Add or remove element to list of expanded sections if
   * user expand or collapse it.
   */
  emitter.on('expand-section', id => {
    state.expandedSection = id
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
