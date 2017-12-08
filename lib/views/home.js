const hero = require('../components/hero')
const html = require('choo/html')
const view = require('../components/view')
const { asText } = require('prismic-richtext')
const blurb = require('../components/blurb')
const testimonial = require('../components/testimonial')

module.exports = home

function home (state, emit) {
  const pageType = 'homepage'
  const doc = state.pages.find(page => page.type === pageType)

  if (!doc) {
    emit('pages:fetch', { single: pageType })
    return view(state, emit, pageType, hero.loading(pageType))
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, pageType, html`
    <div class="App-home">
      ${hero(doc, pageType)}
      ${doc.data.body.map((slice, index) => {
        switch (slice.slice_type) {
          case 'text': return blurb(slice.primary, index, state.visibleOnLanding, emit)
          case 'testimonial': return testimonial(slice.primary, index, state.visibleOnLanding, emit)

          default: return null
        }
      })}
    </div>
  `
  )
}
