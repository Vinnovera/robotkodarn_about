const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const { __ } = require('../../locale')
const { icon } = require('../utils')

module.exports = class Expander extends Nanocomponent {
  constructor (id) {
    super(`expander-${id}`)
    this.isExpanded = false
  }

  createElement (isExpanded, onclick, color, id) {
    return html`
      <div class="Section-expander">
        ${!this.isExpanded ? html`
          <button class="Button Button--toggle" onclick=${onclick} aria-controls="${id}" aria-expanded="${this.isExpanded ? 'true' : 'false'}">

            ${icon('expand', 'Section-icon', color)}
            ${__('Read more')}
          </button>
        ` : null}
      </div>
    `
  }

  update (isExpanded) {
    if (isExpanded !== this.isExpanded) {
      this.isExpanded = isExpanded

      const onanimationend = (event) => {
        this.element.removeEventListener('animationend', onanimationend)
        this.rerender()
      }

      this.element.addEventListener('animationend', onanimationend)

      if (this.isExpanded) {
        this.element.classList.add('Section-expander--implode')
      } else {
        this.element.classList.add('Section-expander--expand')
        this.rerender()
      }
    }

    return false
  }

  afterupdate () {
    if (!this.isExpanded) {
      try {
        this.element.scrollIntoView({ block: 'center', behavior: 'smooth' })
      } catch (err) {
        /**
         * Needed since Firefox has a bug reported on block: 'center'
         * https://bugzilla.mozilla.org/show_bug.cgi?id=1389274
         */
        this.element.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }
}
