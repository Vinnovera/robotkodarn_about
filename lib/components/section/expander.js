const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const { __ } = require('../../locale')

module.exports = class Expander extends Nanocomponent {
  constructor (id) {
    super(`expander-${id}`)
    this.isExpanded = false
  }

  createElement (isExpanded, onclick) {
    return html`
      <div class="Section-expander">
        ${this.isExpanded ? html`<hr class="Section-ruler">` : html`
          <button onclick=${onclick} class="Button Button--inverted">
            ${__('Read more')}
          </button>
        `}
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
      this.element.classList.add('Section-expander--implode')
    }

    return false
  }
}
