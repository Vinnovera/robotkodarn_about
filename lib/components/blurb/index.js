const html = require('choo/html')
const asElement = require('prismic-element')
const { modifiers, linkResolver, serialize } = require('../utils')
const pattern = require('../pattern')
const { __ } = require('../../locale')

module.exports = blurb
module.exports.loading = loading

/**
 * A component for rendering blurbs (used on the homepage)
 *
 * @param {string} type I.e. text or testimonial
 * @param {object} content The content retrieved from Prismic
 * @param {number} number  Unique for this instance, used in styling
 * @param {array} visibleOnLanding Retrieved from state,
 *                                 contains all the sections that user has scrolled by.
 * @param {function} emit Called when section has been scrolled into view.
 */
function blurb (type, content, number, visibleOnLanding, emit) {
  const identifier = `Blurb-${type}--${number}`
  const index = visibleOnLanding.indexOf(identifier)
  const contentStyle = modifiers('Blurb-content', {
    visible: index !== -1,
    [type]: true
  })

  let section

  if (type === 'text') {
    section = html`
      <section class="Blurb Blurb-${type}">
        <div class="${contentStyle}">
          <h2 class="Blurb-title">${content.title}</h2>
          ${asElement(content.text, linkResolver, serialize('Blurb'))}
        </div>
      </section>
    `
  } else if (type === 'testimonial') {
    section = html`
      <div class="Blurb Blurb-${type}">
        <blockquote class="${contentStyle}" cite="${content.author}">
          <p class="Blurb-quote">${content.quote}</p>
          <cite class="Blurb-author">– ${content.author}</cite>
        </blockquote>
        ${pattern.triangles('mauve')}
      </div>
    `
  }

  return section
}

function loading (type) {
  if (type === 'text') {
    return html`
      <section class="Blurb Blurb-text Blurb-text--loading">
        <div class="Blurb-content">
          <h2 class="Blurb-title u-loading">${__('Loading')}</h2>
          <p class="Blurb-content u-loading u-heightM">${__('Loading text')}</p>
        </div>
      </section>
    `
  } else if (type === 'testimonial') {
    return html`
      <div class="Blurb Blurb-testimonial u-loadingTransparent">
        <p class="Blurb-content u-loadingTransparent u-heightM">${__('Loading text')}</p>
        ${pattern.triangles()}
      </div>
    `
  }
}
