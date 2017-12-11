const html = require('choo/html')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = footer

/**
 * Footer component, used on all pages through view component.
 *
 * @param {object} state The whole state of the app
 * @param {function} emit Used to fetch pages from Prismic if necessary
 * @param {string} color I.e. 'snow', used for color styling
 */
function footer (state, emit, color) {
  const contactDoc = state.pages.find(page => page.type === 'contact')
  const frameworkDoc = state.pages.find(page => page.type === 'framework')

  /**
   * Get content from Prismic if it's not already fetched
   */
  if (!contactDoc) {
    return emit('pages:fetch', { single: 'contact' })
  } else if (!frameworkDoc) {
    return emit('pages:fetch', { single: 'framework' })
  }

    /**
   * Removes everything in a string up until a colon
   * (including the colon).
   * @param {string} url
   */
  const trim = url => {
    const trimmed = url.replace(/^(.*):/, '')
    return trimmed
  }

  return html`
    <footer class="Footer Footer--${color}">
      <div class="Footer-content">
        <div class="Footer-summary">
          <h3 class="u-textM u-textWeightL u-textUppercase u-marginBottomM">${frameworkDoc.data.footer_title}</h3>
          <p class="u-textS u-fontFamilySans u-marginBottomL">${frameworkDoc.data.footer_summary}</p>
        </div>
        ${contactDoc.data.body.map(slice => {
          switch (slice.slice_type) {
            case 'company_address': return html`
              <address class="Footer-address">
                <p class="u-textS u-fontFamilySans">
                  <span class="u-textWeightL">${slice.primary.company_name}</span><br>
                  ${slice.primary.street_address}<br>
                  ${slice.primary.postal_code} ${slice.primary.city}<br>
                  <a class="Footer-link" href="${slice.primary.email.url}">${trim(slice.primary.email.url)}</a><br>
                  ${slice.primary.phone}
                </p>
              </address>
            `
            default: return null
          }
        })}
      </div>
    </footer>
  `
}
