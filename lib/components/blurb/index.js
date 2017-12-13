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
  const identifier = `Blurb-${type}--${number}`
  const index = visibleOnLanding.indexOf(identifier)
  const contentStyle = getStyles(type, index)
  let section

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
    section = html`
      <section class="Blurb Blurb-${type}">
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
            <a class="Button Button--white" href="/${content.link.uid}">${content.link_text}</a>
          </div>
        </div>
      </section>
    `
  } else if (type === 'testimonial') {
    section = html`
      <section class="Blurb Blurb-${type}">
        ${quoteMark()}
        <div class="${contentStyle}">
          <q class="Blurb-${type}--quote">${content.quote}</q>
          <cite>– ${content.name}, ${content.role} ${(__('At')).toLowerCase()} ${content.organization}</cite>
        </div>
      </section>
    `
  }

  return section
}

const getStyles = (type, index) => {
  let style = 'Blurb-content'

  if (index !== -1) {
    style += ' Blurb-content--visible'
  }

  if (type === 'text') {
    style += ' Blurb-content--column'
  }

  return style
}

const quoteMark = () => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d="M148 91.8V83c-24.5-3.2-36.8-16.8-36.8-41a41 41 0 0 1 11.6-30A40.2 40.2 0 0 1 152.6.3c14.8 0 26.8 5.9 36 17.6a74 74 0 0 1 13.7 46.8 101 101 0 0 1-22 64.7 114.3 114.3 0 0 1-60 38.6v-12.9A79 79 0 0 0 148 91.8zM35.6 91v-7.4a39 39 0 0 1-26-12.1c-6.4-7-9.5-16-9.5-26.8a45 45 0 0 1 11.4-32.4c7.7-8 17.9-12 30.6-12 14.6 0 26.5 6 35.5 18.1 9 12.1 13.6 28 13.6 47.6 0 49.5-27.7 83.5-83.1 102v-12.9c18.3-14 27.4-35.3 27.4-64z" fill="currentColor" fill-rule="evenodd"/>
    </svg>
  `
}

function loading () {
  return html`
    <section>
      <h2>${__('Loading')}</h2>
      <p>${__('Loading')}</p>
    </section>
  `
}
