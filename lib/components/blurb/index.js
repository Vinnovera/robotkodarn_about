const html = require('choo/html')
const asElement = require('prismic-element')
const { modifiers, linkResolver, serialize, renderImage } = require('../utils')
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
function blurb (type, slice, number, visibleOnLanding, emit) {
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
          <h2 class="Blurb-title">${slice.primary.title}</h2>
          ${slice.items.map(item => {
            return html`
              <div>
                <h3 class="Blurb-heading3">${item.title}</h3>
                ${asElement(item.text, linkResolver, serialize('Blurb'))}
                ${item.image.url ? renderImage(item.image, 'Blurb') : null}
              </div>
            `
          })}
        </div>
      </section>
    `
  } else if (type === 'testimonial') {
    section = html`
      <div class="Blurb Blurb-${type}">
        <blockquote class="${contentStyle}" cite="${slice.primary.author}">
          <p class="Blurb-quote">${slice.primary.quote}</p>
          <cite class="Blurb-author">– ${slice.primary.author}</cite>
        </blockquote>
        ${pattern.triangles('mauve')}
      </div>
    `
  }

  return section
}

function loading () {
  return html`
    <section class="Blurb Blurb-text Blurb-text--loading">
      <div class="Blurb-content Blurb-content--text">
        <h2 class="Blurb-title Blurb-title--loading u-loading">${__('Loading')}</h2>
        <p class="u-loading u-heightM">${__('Loading text')}</p>
      </div>
    </section>
  `
}
