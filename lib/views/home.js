const hero = require('../components/hero')
const html = require('choo/html')
const view = require('../components/view')
const { asText } = require('prismic-richtext')
const blurb = require('../components/blurb')

module.exports = home

function home (state, emit) {
  const pageType = 'homepage'
  const color = 'snow'
  const doc = state.pages.find(page => page.type === pageType)

  if (!doc) {
    emit('pages:fetch', { single: pageType })
    return view(state, emit, pageType, hero.loading(pageType, color))
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, pageType, color, html`
    <div class="App-home">
      ${hero(doc, pageType, color)}
      ${doc.data.body.map((slice, index) => {
        switch (slice.slice_type) {
          case 'text': return blurb('text', slice.primary, index, state.visibleOnLanding, emit)
          case 'testimonial': return blurb('testimonial', slice.primary, index, state.visibleOnLanding, emit)

          default: return null
        }
      })}
    </div>
  `
  )
}
