const html = require('choo/html')
const { asText } = require('prismic-richtext')
const { __ } = require('../locale')
const view = require('../components/view')

module.exports = contact

function contact (state, emit) {
  const doc = state.pages.find(page => page.type === 'contact')

  if (!doc) {
    emit('pages:fetch', { single: 'contact' })
    view(state, emit, html`
        <div>
          <h1><em>${__('Loading')}</em></h1>
          <a href="./">Gå tillbaka hem</a>
        </div>
    `)
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, html`
    <div>
      <h1>${asText(doc.data.title)}</h1>
      ${doc.data.body.map(slice => {
        switch (slice.slice_type) {
          case 'company_address': return html`
            <address>
              ${slice.primary.company_name}<br>
              ${slice.primary.street_address}<br>
              ${slice.primary.postal_code} ${slice.primary.city}
            </address>
          `
          case 'contact_person': return html`
            <address>
              ${slice.primary.name}<br>
              <a href="mailto:${slice.primary.email_address}">${slice.primary.email_address}</a><br>
              <a href="tel:${slice.primary.phone_number}">${slice.primary.phone_number}</a>
            </address>
          `
          default: return null
        }
      })}
      <a href="./">Gå tillbaka hem</a>
    </div>
  `)
}
