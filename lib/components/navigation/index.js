const html = require('choo/html')
const { modifiers } = require('../utils')
const { __ } = require('../../locale')

module.exports = navigation

function navigation (state, emit) {
  const doc = state.pages.find(page => page.type === 'framework')

  /**
   * Takes the element and returns the appropriate CSS classes, so that
   * the elements can be styled differently depending on i.e. the menu is
   * open or closed.
   *
   * @param {string} child  The child that is currently in need of CSS class
   * @param {*} uid   The links uid, used to match page href
   */
  const setStyle = (child, uid = '') => {
    /* Both checks are necessary since landing page does not match /${uid} */
    const isCurrent = (`/${uid}` === state.href || uid === state.href)
    const hasActiveStyle = (child === 'item') || (child === 'listLink')

    return modifiers(`Navigation-${child}`, {
      open: state.menuOpen,
      [state.color]: (child === 'listLink'),
      active: (hasActiveStyle && isCurrent)
    })
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
  <nav class="Navigation">
    <a href="#menu" onclick=${toggleMenu} class="${setStyle('link')}">
        ${state.menuOpen ? __('Exit') : __('Menu')}
        <div class="${setStyle('icon')}">
        <span class="${setStyle('span1')}"></span>
        <span class="${setStyle('span2')}"></span>
        <span class="${setStyle('span3')}"></span>
        </div>
      </a>
    <ul class="${setStyle('list', '')}" id="menu">
    ${doc.data.navigation.map(item => {
      return html`
        <li class="${setStyle('item', item.link.uid)}">
          <a onclick=${toggleMenu} class="${setStyle('listLink', item.link.uid)}" href="/${item.link.uid ? item.link.uid : ''}">
            ${item.title}
          </a>
        </li>`
    })}
    </ul>
  </nav>
  `
}
