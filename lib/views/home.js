const hero = require('../components/hero')
const html = require('choo/html')
const createView = require('../components/view')
const { asText } = require('prismic-richtext')
const blurb = require('../components/blurb')

module.exports = createView('homepage', home)

/**
 * Main view rendered on home page.
 *
 * @param {object} state
 * @param {function} emit
 */
function home (state, emit) {
  const doc = state.pages.find(page => page.type === state.pageType)

  /**
   * If content isn't already fetched from CMS,
   * show loading component.
   */
  if (!doc) {
    emit('pages:fetch', { single: state.pageType })
    return html`
      <div class="App">
        ${hero.loading({ color: state.color, pageType: state.pageType })}
        ${blurb.loading()}
      </div>
    `
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return html`
    <div class="App">
      ${hero(doc, { color: state.color, pageType: state.pageType })}
      ${doc.data.body.map(slice => {
        return blurb(slice.slice_type, slice, emit)
      })}
    </div>
  `
}
