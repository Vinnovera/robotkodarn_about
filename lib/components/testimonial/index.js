const html = require('choo/html')
const nanoraf = require('nanoraf')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
const { hasEntered } = require('../utils')
sheetify('./index.css')

module.exports = testimonial
module.exports.loading = loading

/**
 * A component for rendering user testimonials.
 *
 * @param {object} content The content retrieved from Prismic
 * @param {number} number  Unique for this instance, used in styling
 * @param {array} visibleOnLanding Retrieved from state,
 *                                 contains all the sections that user has scrolled by.
 * @param {function} emit Called when section has been scrolled into view.
 */
function testimonial (content, number, visibleOnLanding, emit) {
  let identifier = `Testimonial--${number}`
  let style = `Testimonial ${identifier}`
  const index = visibleOnLanding.indexOf(identifier)

  /**
   * Add visible class if user has scrolled by component
   */
  if (index !== -1) {
    style += ` Testimonial--visible`
  }

  const onscroll = nanoraf(() => {
    if (hasEntered(section)) {
      emit('has-entered', identifier)

      /*
       * FIXME: Make sure that the event listener is removed completely after this has
       * been done. Right now, this is not working.
       */
      window.removeEventListener('scroll', onscroll)
    }
  })

  window.addEventListener('scroll', onscroll, { passive: true })

  const section = html`
    <section class="${style}">
      <q class="Testimonial-quote">${content.quote}</q>
      <cite>– ${content.name}, ${content.role} ${(__('At')).toLowerCase()} ${content.organization}</cite>
    </section>
  `

  return section
}

function loading () {
  return html`
    <section>
      <h2>${__('Loading')}</h2>
      <p>${__('Loading')}</p>
    </section>
  `
}
