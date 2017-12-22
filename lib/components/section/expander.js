const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const { __ } = require('../../locale')
const { icon } = require('../utils')

module.exports = class Expander extends Nanocomponent {
  constructor (id) {
    super(`expander-${id}`)
    this.isExpanded = false
  }

  createElement (isExpanded, onclick, color) {
    return html`
      <div class="Section-expander">
        ${!this.isExpanded ? html`
          <button class="Button Button--toggle" onclick=${onclick}>
            <span class="Section-icon Section-icon--${color}">
              ${icon('expand')}
            </span>
            ${__('Read more')}
          </button>
        ` : null}
      </div>
    `
  }

  update (isExpanded) {
    if (isExpanded !== this.isExpanded) {
      this.isExpanded = isExpanded

      const onanimationend = () => {
        this.element.removeEventListener('animationend', onanimationend)
        this.rerender()
      }

      this.element.addEventListener('animationend', onanimationend)

      if (this.isExpanded) {
        this.element.classList.add('Section-expander--implode')
      } else {
        this.element.classList.add('Section-expander--appearing')
      }
    }

    return false
  }
}
