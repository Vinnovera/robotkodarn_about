const hero = require('../components/hero')
const html = require('choo/html')
const view = require('../components/view')
const { asText } = require('prismic-richtext')
const blurb = require('../components/blurb')

module.exports = home

/**
 * Main view rendered on home page.
 *
 * @param {object} state
 * @param {function} emit
 */
function home (state, emit) {
  /**
   * Options used when fetching content
   * and deciding color scheme.
   */
  const opts = {
    theme: {
      color: 'celestial',
      dark: true
    },
    type: 'homepage'
  }

  const doc = state.pages.find(page => page.type === opts.type)

  /**
   * If content isn't already fetched from CMS,
   * show loading component.
   */
  if (!doc) {
    emit('pages:fetch', { single: opts.type })
    return view(state, emit, opts, hero.loading(opts))
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, opts, html`
    <div class="App">
      ${hero(doc, opts)}
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
