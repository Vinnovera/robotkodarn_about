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
  const doc = state.pages.items.find(page => page.type === state.pageType)

  /**
  * Show loading component while content is being fetched from CMS.
  * Normally, this will not happen, but it could if a user navigates
  * between pages before all are are available on state.
  */
  if (!doc && state.pages.loading) {
    return html`
      <div>
        ${hero.loading({ color: state.color, pageType: state.pageType })}
        ${section.loading()}
      </div>
    `
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
