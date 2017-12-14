const html = require('choo/html')
const { asText } = require('prismic-richtext')
const hero = require('../components/hero')
const view = require('../components/view')

module.exports = contact

/**
 * View rendered on contact page
 *
 * @param {object} state
 * @param {function} emit
 */
function contact (state, emit) {
  /**
   * Options used when fetching content
   * and deciding color scheme.
   */
  const opts = {
    theme: {
      color: 'celestial',
      dark: true
    },
    type: 'contact'
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
    <div class="App App-left">
      ${hero(doc, opts)}
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
  `)
}
