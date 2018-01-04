const html = require('choo/html')
const asElement = require('prismic-element')
const Expander = require('./expander.js')
const {
  convertToId,
  icon,
  linkResolver,
  modifiers,
  renderImage,
  serialize
} = require('../utils')
const { __ } = require('../../locale')

module.exports = section
module.exports.loading = loading

const expanders = {}
const hasWindow = typeof window !== 'undefined'

/**
 * Section component, used on article and contact page.
 *
 */
function section (state = {}, emit, slice, page, type = 'text') {
  const anchor = convertToId(slice.primary.title)
  const isExpanded = state.expanded.indexOf(anchor) !== -1
  let expander = expanders[anchor]

  if (!expander) {
    expander = expanders[anchor] = new Expander(anchor)
  }

  /**
   * Expands section when user hits 'Read More'
   */
  const expandSection = event => {
    emit('toggle-section', anchor)
    event.preventDefault()
  }

  /**
   * Implodes section when user hits 'Show less'
   */
  const implodeSection = event => {
    /* Get ID of container to be imploded */
    const id = event.currentTarget.getAttribute('aria-controls')
    const container = document.getElementById(id)

    /* Remove expand class since this one has an animation of its own */
    container.classList.remove('Section-elaborated--expand')

    const onanimationend = (event) => {
      container.removeEventListener('animationend', onanimationend)
      emit('toggle-section', anchor)
    }

    container.addEventListener('animationend', onanimationend)

    /* Used for animating 'Show Less' button */
    container.classList.add('Section-elaborated--implode')

    event.preventDefault()
  }

  /**
   * Some sections have more in depth information.
   * When this happens, the section is accompanied with a "Read More" Button
   * and an elaborated section.
   */
  let hasMore

  if (slice.primary.in_depth && Array.isArray(slice.primary.in_depth)) {
    hasMore = slice.primary.in_depth.length
  }

  /**
   * Create an id for the expanded section,
   * used when toggling between 'Read more' and 'Show less'
   */
  const id = hasMore ? convertToId(slice.primary.in_depth[0].text.split(' ').slice(0, 5).join('-').toLowerCase()) : null

  return html`
  <article class="${modifiers('Section', { [type]: true, [page]: true })}">

    <div class="${modifiers('Section-content', { [state.color]: true })}">
      <h2 class="${modifiers('Section-title', { [type]: true })}" id=${anchor}>${slice.primary.title}</h2>
      ${asElement(slice.primary.text, linkResolver, serialize('Section'))}
      ${hasWindow && hasMore ? expander.render(isExpanded, expandSection, state.color, id) : null}
    </div>

    ${hasMore && (isExpanded || !hasWindow) ? html`
      <div class="${modifiers('Section-elaborated', { expand: true })}" id="${id}">
        <div class="${modifiers('Section-content', { [state.color]: true })}">
          ${asElement(slice.primary.in_depth, linkResolver, serialize('Section'))}
          ${hasWindow && hasMore ? html`
          <button class="Button Button--toggle" onclick=${implodeSection} aria-controls="${id}" aria-expanded="true">
              ${icon('implode', 'Section-icon', state.color)}
              <span class="Section-buttontext">${__('Show less')}</span>
            </button>
          ` : null}
        </div>
      </div>
    ` : null}

    ${slice.primary.image.url
      ? html`
        <div class="Section-content">
          ${renderImage(slice.primary.image, 'Section')}
        </div>
      `
      : null
    }

  </article>
`
}

function loading () {
  return html`
  <article class="Section">
    <h2 class="Section-title u-loading">${__('Loading')}</h2>
    <p class="Section-paragraph u-loading u-heightM">
      ${__('Loading text')}
    </p>
  </article>
  `
}
