const html = require('choo/html')
const { asText } = require('prismic-richtext')
const hero = require('../components/hero')
const createView = require('../components/view')

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
    <div class="App App-left">
      ${hero(doc, { color: state.color, pageType: state.pageType })}
      ${doc.data.body.map(slice => {
        switch (slice.slice_type) {
          case 'company_address': return html`
            <address>
              ${slice.primary.company_name}<br>
              ${slice.primary.street_address}<br>
              ${slice.primary.postal_code} ${slice.primary.city}
            </address>
          `
          default: return null
        }
      })}
    </div>
  `
}
