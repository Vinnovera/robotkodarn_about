const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const { modifiers } = require('../utils')
const { __ } = require('../../locale')

/**
 * Navigation component, displayed on all pages
 */
module.exports = class Navigation extends Nanocomponent {
  constructor () {
    super('navigation')
    this.isOpen = false
  }

  // Rerender on update since colors and active link has changed
  update () {
    return true
  }

  toggle () {
    this.isOpen = !this.isOpen

    /* Prevent touchmove and wheel when menu is open */
    if (this.isOpen) {
      this.element.addEventListener('touchmove', this)
      this.element.addEventListener('wheel', this)
    } else {
      this.element.removeEventListener('touchmove', this)
      this.element.removeEventListener('wheel', this)
    }

    this.rerender()
  }

  handleEvent (event) {
    event.preventDefault()
  }

  createElement (state) {
    const doc = state.pages.items.find(page => page.type === 'framework')

    /**
     * 1. Both checks are necessary since landing page does not match /${uid}
     *
     * @param {string} child
     * @param {*} uid  Current childs's uid, used to match page href
     */
    const setStyle = (child, uid = '') => {
      const isCurrent = (`/${uid}` === state.href || uid === state.href) /* 1. */
      const hasActiveStyle = (child === 'item') || (child === 'listLink')

      return modifiers(`Navigation-${child}`, {
        open: this.isOpen,
        [state.color]: (child === 'listLink'),
        active: (hasActiveStyle && isCurrent)
      })
    }

    /**
     * Change internal state when user
     * clicks navigation icon
     */
    const toggleMenu = (event) => {
      this.toggle()

      if (!event.target.href || event.target.hash) {
        event.preventDefault()
      }
    }

    return html`
      <nav class="Navigation">
        <a href="#menu" onclick=${toggleMenu} class="${setStyle('link')}">
            ${this.isOpen ? __('Exit') : __('Menu')}
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
}
