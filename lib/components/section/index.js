const html = require('choo/html')
const asElement = require('prismic-element')
const Expander = require('./expander.js')
const { convertToId, modifiers, linkResolver, serialize, icon } = require('../utils')
const { __ } = require('../../locale')

module.exports = section
module.exports.loading = loading

const expanders = {}
const hasWindow = typeof window !== 'undefined'

function section (state = {}, emit, slice, page, type = 'text') {
  const anchor = convertToId(slice.primary.title)
  const isExpanded = state.expanded.indexOf(anchor) !== -1
  let expander = expanders[anchor]

  if (!expander) {
    expander = expanders[anchor] = new Expander(anchor)
  }

  /**
   * Expands Section when user hits 'Read More'
   */
  const expandSection = event => {
    emit('toggle-section', anchor)
    event.preventDefault()
  }

  /**
   * Implodes Section when user hits 'Show less'
   */
  const implodeSection = event => {
    const id = event.target.getAttribute('aria-controls')
    console.log(event.target)
    const container = document.getElementById(id)

    // FIXME: This is in desperate need of comments!
    const onanimationend = (event) => {
      container.removeEventListener('animationend', onanimationend)
      container.previousElementSibling.scrollIntoView({block: 'center', behavior: 'smooth'})
      emit('toggle-section', anchor)
    }

    container.addEventListener('animationend', onanimationend)
    container.classList.add('Section-content--implode')
    event.preventDefault()
  }

  const textblock = () => {
    let hasMore

    if (slice.primary.in_depth && Array.isArray(slice.primary.in_depth)) {
      hasMore = slice.primary.in_depth.length
    }

    const id = hasMore ? convertToId(slice.primary.in_depth[0].text.split(' ').slice(0, 5).join('-').toLowerCase()) : null

    return html`
      <div>
        ${asElement(slice.primary.text, linkResolver, serialize('Section'))}
        ${hasWindow && hasMore ? expander.render(isExpanded, expandSection, state.color, id) : null}
        ${hasMore && (isExpanded || !hasWindow) ? html`
          <div class="Section-content Section-content--expandable" id="${id}">
            ${asElement(slice.primary.in_depth, linkResolver, serialize('Section'))}
            ${hasWindow && hasMore ? html`
              <p class="Section-paragraph">
                <button class="Button Button--toggle" onclick=${implodeSection} aria-controls="${id}" aria-expanded="true">
                    ${icon('implode', 'Section-icon', state.color)}
                    ${__('Show less')}
                  </button>
              </p>
            ` : null}
          </div>
        ` : null}
      </div>
    `
  }

  return html`
    <article class="${modifiers('Section', { [type]: true, [page]: true })}">
      <h2 class="${modifiers('Section-title', { [type]: true })}" id=${anchor}>${slice.primary.title}</h2>
      <div class="${modifiers('Section-content', { [state.color]: true })}">
        ${type === 'text' ? textblock() : null}
        ${type === 'team' ? html`
          <div class="Section-cards">${renderCards(slice.items, state.color)}</div>
        ` : null}
      </div>
    </article>
  `
}

function renderCards (items, color) {
  return items.map(item => {
    return html`
      <section class="Section-card">
        <p class="u-textXS u-textWeightM u-fontFamilySans">
          <span class="${modifiers('Section-date', { [color]: true })}">
            ${' ' + item.from + ' – ' + item.to + ' | '}
          </span>
          ${item.description}
        </p>
        <ul class="Section-list">
          ${item.contributors_list.map(contributor => html`
            <li class="u-fontFamilySans u-textWeightM u-textXS u-lineHeightL">${contributor.text}</li>
          `)}
        </ul>
      </section>
    `
  })
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
