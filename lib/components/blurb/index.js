const html = require('choo/html')
const nanoraf = require('nanoraf')
const asElement = require('prismic-element')
const { hasEntered } = require('../utils')
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
  const contentStyle = getStyles(type, index)
  let section

  if (typeof window !== 'undefined') {
        /*
    * FIXME: Make sure that the event listener is removed completely after this has
    * been done. Right now, this is not working.
    * FIXME: window is not definied on initial load!
    * This will be the way forward: https://github.com/choojs/nanocomponent#es6-class-syntax
    */
    const onscroll = nanoraf(() => {
      if (hasEntered(section)) {
        emit('has-entered', identifier)
        window.removeEventListener('scroll', onscroll)
      }
    })

    window.addEventListener('scroll', onscroll, { passive: true })
  }

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
        <div class="u-widthXL u-flex u-flexEnd u-marginAuto">
          <div class="${contentStyle}">
            <q class="Blurb-quote">${content.quote}</q>
            <cite class="Blurb-author">– ${content.name}, ${content.role} ${(__('At')).toLowerCase()} ${content.organization}</cite>
          </div>
        </div>
      </section>
    `
  }

  return section
}

const getStyles = (type, index) => {
  let style = `Blurb-${type}Content`

  if (index !== -1) {
    style += ` Blurb-${type}Content--visible`
  }

  return style
}

function loading (type) {
  if (type === 'text') {
    return html`
      <section class="Blurb Blurb-text Blurb-text--loading">
        <div class="Blurb-content">
          <h2 class="Blurb-title Blurb-title--loading">${__('Loading')}</h2>
          <p class="Blurb-content--loading">${__('Loading textblock text')}</p>
        </div>
      </section>
    `
  } else if (type === 'testimonial') {
    return html`
      <section class="Blurb Blurb-testimonial Blurb-testimonial--loading">
        <p class="Blurb-content--loading">${__('Loading textblock text')}</p>
      </section>
    `
  }
}
