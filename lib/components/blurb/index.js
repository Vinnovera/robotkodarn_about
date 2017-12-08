const html = require('choo/html')
const nanoraf = require('nanoraf')
const asElement = require('prismic-element')
const { hasEntered } = require('../utils')
const { __ } = require('../../locale')
const sheetify = require('sheetify')
sheetify('./index.css')

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
  let identifier = `Blurb-${type}--${number}`
  const index = visibleOnLanding.indexOf(identifier)
  let section

  // Add visible class if user has scrolled to component
  let contentStyle = (index !== -1)
    ? `Blurb-${type}Content Blurb-${type}Content--visible`
    : `Blurb-${type}Content`

  const carret = () => {
    return html`
      <svg class="Blurb-carret" >
        <path  d="M0 2.3L2 0l5.5 4.7L12.9 0 15 2.3 7.5 8.8z" fill="currentColor" fill-rule="evenodd"/>
      </svg>
    `
  }

  /*
   * FIXME: Make sure that the event listener is removed completely after this has
   * been done. Right now, this is not working.
   * This will be the way forward: https://github.com/choojs/nanocomponent#es6-class-syntax
   */
  const onscroll = nanoraf(() => {
    if (hasEntered(section)) {
      emit('has-entered', identifier)
      window.removeEventListener('scroll', onscroll)
    }
  })

  window.addEventListener('scroll', onscroll, { passive: true })

  if (type === 'text') {
    console.log(content)
    section = html`
      <section class="Blurb-${type}">
        <div class="${contentStyle}">
          ${content.image.url !== undefined
          ? html`
            <div class="Blurb-imageContainer">
              <img class="Blurb-image" src="" alt=""/>
            </div>
          `
          : ''
          }
          <div class="u-paddingSidesL">
            <h2 class="Blurb-title">${content.title}</h2>
            ${asElement(content.text)}
            <a class="Button Button--square Button--white" href="/${content.link.uid}">${content.link_text} ${carret()}</a>
          </div>
        </div>
      </section>
    `
  } else if (type === 'testimonial') {
    section = html`
      <section class="Blurb-${type}">
        <div class="${contentStyle}">
          <q class="Blurb-${type}--quote">${content.quote}</q>
          <cite>– ${content.name}, ${content.role} ${(__('At')).toLowerCase()} ${content.organization}</cite>
        </div>
      </section>
    `
  }

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
