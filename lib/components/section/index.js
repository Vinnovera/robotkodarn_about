const html = require('choo/html')
const asElement = require('prismic-element')
const Expander = require('./expander.js')
const { convertToAnchor, modifiers, linkResolver, serialize } = require('../utils')
const { __ } = require('../../locale')

module.exports = section
module.exports.loading = loading

const expanders = {}
const hasWindow = typeof window !== 'undefined'

function section (state = {}, emit, slice, page, type = 'text') {
  const anchor = convertToAnchor(slice.primary.title)
  const isExpanded = state.expanded.indexOf(anchor) !== -1
  let expander = expanders[anchor]

  if (!expander) {
    expander = expanders[anchor] = new Expander(anchor)
  }

  const expandSection = event => {
    emit('expand', anchor)
    event.preventDefault()
  }

  const textblock = () => {
    let hasMore

    if (slice.primary.in_depth && Array.isArray(slice.primary.in_depth)) {
      hasMore = slice.primary.in_depth.length
    }

    return html`
      <div>
        ${asElement(slice.primary.text, linkResolver, serialize('Section'))}
        ${hasWindow && hasMore ? expander.render(isExpanded, expandSection) : null}
        ${hasMore && (isExpanded || !hasWindow) ? html`
          <div class="Section-content Section-content--appear">
            ${asElement(slice.primary.in_depth, linkResolver, serialize('Section'))}
          </div>
        ` : null}
      </div>
    `
  }

  return html`
    <article class=${modifiers('Section', { [type]: true, [page]: true })}>
      <h2 class="Section-title Section-title--team" id=${anchor}>${slice.primary.title}</h2>
      <div class=${modifiers('Section-content', { [state.color]: true })}>
        ${type === 'text' ? textblock() : null}
        ${type === 'team' ? html`
          <div class="Section-cards">${renderCards(slice.items)}</div>
        ` : null}
      </div>
    </article>
  `
}

function renderCards (items) {
  return items.map(item => {
    return html`
      <section class="Section-card">
        <p class="Section-paragraph u-inline">${item.description}</p>
        <ul class="Section-list">
          ${item.contributors_list.map(contributor => html`
            <li class="Section-listitem u-textWeightL u-lineHeightL">${contributor.text}</li>
          `)}
        </ul>
        <h3 class="Section-heading3 Section-heading3--card"> ${' ' + item.from + ' - ' + item.to}</h3>
      </section>
    `
  })
}

function loading () {
  return html`
  <article class="Section">
    <h2 class="Section-title Section-title--loading">${__('Loading')}</h2>
    <p class="Section-section Section-text--loading">${__('Loading text')}</p>
  </article>
  `
}
