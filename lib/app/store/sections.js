module.exports = sections

/**
 * Stores all sections on article page and checks which should be expanded.
 *
 * @param {object} state
 * @param {objecy} emitter
 */
function sections (state, emitter) {
  state.expandedSections = []

  emitter.on('expand-section', (id) => {
    const index = state.expandedSections.indexOf(id)

    if (index === -1) {
      state.expandedSections.push(id)
    } else {
      state.expandedSections.splice(index, 1)
    }

    emitter.emit('render')
  })
}
