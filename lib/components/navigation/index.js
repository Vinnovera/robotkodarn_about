const html = require('choo/html')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = navigation

function navigation (state, emit) {
  /**
   * Checks whether or not menu is open, and sets
   * class on span element.
   * @param {number} int The number of the span element
   */
  const setClass = int => {
    if (state.menuOpen) {
      return `Navigation-span${int} Navigation-span${int}--open`
    } else {
      return `Navigation-span${int}`
    }
  }

  /**
   * Emits toggle event when
   * user clicks on navigation icon
   */
  const toggle = () => {
    emit('toggle')
  }

  return html`
  <div class="Navigation">
    <div onclick=${toggle} class="Navigation-icon">
      <span class=${setClass(1)}></span>
      <span class=${setClass(2)}></span>
      <span class=${setClass(3)}></span>
    </div>
  </div>
  `
}
