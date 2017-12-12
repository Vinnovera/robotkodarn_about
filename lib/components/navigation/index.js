const html = require('choo/html')
const sheetify = require('sheetify')
sheetify('./index.css')
const { __ } = require('../../locale')

module.exports = navigation

function navigation (state, emit, opts) {
  const doc = state.pages.find(page => page.type === 'framework')

  /**
   * Get content from CMS if it's not already fetched
   */
  if (!doc) {
    return emit('pages:fetch', { single: 'framework' })
  }

  /**
   * Takes the element and returns the appropriate CSS classes, so that
   * the elements can be styled differently depending on i.e. the menu is
   * open or closed.
   *
   * @param {string} element  The element that is currently in need of CSS class
   * @param {*} number If the element needs a unique class, it can be given a number
   * @param {*} uid   The links uid, used to match page href
   */
  const setStyle = (element, number, uid = '') => {
    const hasActiveStyle = (element === 'item') || (element === 'listLink')
    const isCurrent = (`/${uid}` === state.href)

    let style = `Navigation-${element}${number}`

    if (state.menuOpen) {
      style += ` Navigation-${element}${number}--open`
    }

    // listLinks are styled differently depending on page type
    if (element === 'listLink') {
      style += ` Navigation-${element}--${opts.theme.color}`
    }

    // Additional styling if background is dark.
    if (opts.theme.dark) {
      style += ` Navigation-${element}--dark`
    }

    /*
     * Additional styling when user is visiting the same page
     * that the element points to.
     */
    if (hasActiveStyle && isCurrent) {
      style += ` Navigation-${element}--active`
    }

    return style
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
    <a href="#menu" onclick=${toggleMenu} class="${setStyle('link', '')}">
        ${state.menuOpen ? __('Exit') : __('Menu')}
        <div class="${setStyle('icon', '')}">
        <span class="${setStyle('span', 1)}"></span>
        <span class="${setStyle('span', 2)}"></span>
        <span class="${setStyle('span', 3)}"></span>
        </div>
      </a>
    <ul class="${setStyle('list', '')}" id="menu">
    ${doc.data.navigation.map(item => {
      /*
       * Do not render "Home" link when user is visiting homepage
       */
      if (item.title === __('Home') && opts.type === 'homepage') {
        return
      }

      return html`
        <li class="${setStyle('item', '', item.link.uid)}">
          <a onclick=${toggleMenu} class="${setStyle('listLink', '', item.link.uid)}" href="/${item.link.uid ? item.link.uid : ''}">
            ${item.title}
          </a>
        </li>`
    })}
    </ul>
  </nav>
  `
}
