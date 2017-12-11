const html = require('choo/html')
const { asText } = require('prismic-richtext')
const view = require('../components/view')
const pattern = require('../components/pattern')
const heading = require('../components/heading')

module.exports = contact

function contact (state, emit) {
  const doc = state.pages.find(page => page.type === 'contact')

  if (!doc) {
    emit('pages:fetch', { single: 'contact' })
    return view(state, emit, 'pink', html`
        <div>
          ${heading.loading()}
          ${pattern('pink')}
        </div>
    `)
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, 'pink', html`
    <div>
      <div>
          ${heading(doc.data.title)}
          ${pattern('pink')}
      </div>
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
