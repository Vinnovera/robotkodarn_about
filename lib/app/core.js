const Choo = require('choo')
const nanohref = require('nanohref')

module.exports = Core

/**
 * Custom extensions on choo to support anchor links.
 * Fix for https://github.com/choojs/choo/issues/440
 *
 * @param {object} opts
 * @returns Core
 */

function Core (opts) {
  if (!(this instanceof Core)) { return new Core(opts) }

  Choo.call(this, Object.assign({}, opts, { href: false }))

  // Strips out the hash when figuring out the window.location
  this._createLocation = function () {
    return window.location.pathname.replace(/\/$/, '')
  }
}

Core.prototype = Object.create(Choo.prototype)

Core.prototype.start = function (...args) {
  nanohref(anchor => {
    const hash = anchor.href.split('#')[1]
    const href = anchor.pathname.replace(/\/?$/, '') + (hash ? `#${hash}` : '')

    /* If it's an anchor on the same page => scrollIntoView
    * scrollIntoView is supported natively by Chrome and Firefox.
    */
    if (anchor.pathname === window.location.pathname) {
      if (hash !== window.location.hash) {
        const element = document.querySelector(`#${hash}`)

        // Store hash in state
        this.state.hash = hash

        if (element) {
          const scrollY = window.scrollY
          element.focus()
          window.scrollTo(0, scrollY)
          element.scrollIntoView({ block: 'start', behavior: 'smooth' })

          // Add on hash because the URL is UI 💯
          window.history.replaceState({}, document.title, href)
        }
      }
      return
    }

    // Emit navigation event
    this.emitter.emit(this._events.PUSHSTATE, anchor.pathname)
  })

  return Choo.prototype.start.call(this, ...args)
}
