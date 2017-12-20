const html = require('choo/html')
const asElement = require('prismic-element')
const { convertToAnchor, modifiers, linkResolver, serialize } = require('../utils')
const { __ } = require('../../locale')

module.exports = section
module.exports.loading = loading

function section (state = {}, emit, slice, type = 'text', expandable = true) {
  const anchor = convertToAnchor(slice.primary.title)
  const index = state.expanded.indexOf(anchor)

  const expandSection = event => {
    emit('expand', anchor)
    event.preventDefault()
  }

  const button = () => {
    return html`
      <button onclick=${expandSection} class="Button Button--soft">
        ${!opts.open ? __('Read more') : __('Show less')}
      </button>
    `
  }

  const opts = {
    open: index !== -1,
    anchor: anchor,
    expandButton: button
  }

  return html`
    <article class="Section">
      <h2 class="Section-title" id=${opts.anchor}>${slice.primary.title}</h2>
      <div class="${modifiers('Section-content', { open: opts.open, [state.color]: true, expandable: expandable })}">
        ${type === 'text' ? asElement(slice.primary.text, linkResolver, serialize('Section')) : null}
        ${type === 'team' ? slice.items.map(item => {
          return html`
            <section>
              <h3 class="Section-heading3">${item.from} – ${item.to}</h3>
              <p class="Section-paragraph">${item.description}</p>
              <ul>
                ${item.contributors_list.map(contributor => { return html`<li>${contributor.text}</li>` })}
              </ul>
            </section>
          `
        }) : null}
      </div>
      ${expandable ? button() : null}
  </article>
  `
}

function loading () {
  return html`
    <article class="Section">
      <h2 class="Section-title Section-title--loading">${__('Loading')}</h2>
      <p class="Section-section Section-text--loading">${__('Loading text')}</p>
    </article>
  `
}
