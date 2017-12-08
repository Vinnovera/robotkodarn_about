const html = require('choo/html')
const nanoraf = require('nanoraf')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
const { hasEntered } = require('../utils')
sheetify('./index.css')

module.exports = testimonial
module.exports.loading = loading

function testimonial (content, state, emit) {
  let style = 'Testimonial'

  const section = html`
  <section class="${style}">
    <p class="Testimonial-quote">${content.quote}</p>
  </section>
`

  const onscroll = nanoraf(() => {
    if (hasEntered(section)) {
      /* FIXME:
       *
       * 1. Figure out why state and emit are undefined. Then, call:
       * emit('has-entered', section)
       * Maybe we need an ID to know which section it is? Use that to set styling on
       * component. Can be 'Testimonial' or 'Testimonial Testimonial--visible'
       *
       * 2. Make sure that the event listener is removed completely after this has
       * been done. Right now, this is not working.
       */

      window.removeEventListener('scroll', onscroll)
    }
  })

  window.addEventListener('scroll', onscroll, { passive: true })

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
