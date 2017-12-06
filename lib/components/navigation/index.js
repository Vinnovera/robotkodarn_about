const html = require('choo/html')
const sheetify = require('sheetify')
sheetify('./index.css')
const { __ } = require('../../locale')

module.exports = navigation

function navigation (state, emit, type, children) {
  const doc = state.pages.find(page => page.type === 'framework')

  const style = `Navigation Navigation--${type}`
  const linkStyle = `Navigation-listLink Navigation-listLink--${type}`

  if (!doc) {
    return emit('pages:fetch', { single: 'framework' })
  }

  /**
   * Sets a class on element depending on
   * if menu is open or closed.
   *
   * @param {string} type Can be span, item, etc.
   * @param {number} int The number of the item (optional)
   */
  const setClass = (type, int) => {
    const number = (int !== undefined) ? int : ''

    if (state.menuOpen) {
      return `Navigation-${type}${number} Navigation-${type}${number}--open`
    } else {
      return `Navigation-${type}${number}`
    }
  }

  /**
   * Emits toggle event when
   * user clicks on navigation icon
   */
  const toggleMenu = (event) => {
    emit('toggle-menu')

    /* Prevent default if user has clicked on an element that has
     * no, or if it leads to a link on current page
     * (this is true for menu text and icon).
     */
    if (!event.target.href || event.target.hash) {
      event.preventDefault()
    }
  }

  return html`
  <nav class=${style}>
    <a href="#menu" onclick=${toggleMenu} class=${setClass('link')}>
        ${state.menuOpen ? __('Exit') : __('Menu')}
        <div class=${setClass('icon')}>
        <span class=${setClass('span', 1)}></span>
        <span class=${setClass('span', 2)}></span>
        <span class=${setClass('span', 3)}></span>
        </div>
      </a>
    <ul class=${setClass('list')} id="menu">
    ${doc.data.navigation.map(item => {
      return html`
        <li class=${setClass('item')}>
          <a onclick=${toggleMenu} class=${linkStyle} href="/${item.link.uid ? item.link.uid : ''}">
            ${item.title}
          </a>
        </li>`
    })}
    </ul>
  </nav>
  `
}
