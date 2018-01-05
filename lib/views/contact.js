const html = require('choo/html')
const { asText } = require('prismic-richtext')
const createView = require('../components/view')
const hero = require('../components/hero')
const section = require('../components/section')

module.exports = createView('contact', contact)

/**
 * View rendered on contact page
 *
 * @param {object} state
 * @param {function} emit
 */
function contact (state, emit) {
  const doc = state.pages.find(page => page.type === state.pageType)

  /**
   * If content isn't already fetched from CMS,
   * show loading component.
   */
  if (!doc) {
    emit('pages:fetch', { single: state.pageType })
    return hero.loading({ color: state.color, pageType: state.pageType })
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return html`
    <div class="App">
      ${hero(doc, { color: state.color, pageType: state.pageType })}
      <div class="u-marginBottomXXL">
        ${doc.data.body.map(slice => {
          switch (slice.slice_type) {
            case 'text': return section(state, emit, slice, state.pageType)
            default: return null
          }
        })}
      </div>
    </div>
  `
}
