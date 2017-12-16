const html = require('choo/html')

module.exports = footer

/**
 * Footer component, used on all pages through view component.
 */
function footer (state, emit, color) {
  const contactDoc = state.pages.find(page => page.type === 'contact')
  const frameworkDoc = state.pages.find(page => page.type === 'framework')

    /**
   * Removes everything in a string up until a colon
   * (including the colon).
   * @param {string} url
   */
  const trim = url => {
    const trimmed = url.replace(/^(.*):/, '')
    return trimmed
  }

  /**
   * Removes spaces and hyphens.
   * @param {string} str
   */
  const convertToTel = str => {
    let tel = str.replace(/\s/g, '')
    tel = tel.replace(/-/g, '')
    return tel
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
                <p class="u-textS u-lineHeightXL u-fontFamilySans">
                  <span class="u-textWeightL">${slice.primary.company_name}</span><br>
                  ${slice.primary.street_address}<br>
                  ${slice.primary.postal_code}<span class="u-marginRightS"></span> ${slice.primary.city}<br>
                  <a class="Footer-link Footer-link--expressive" href="${slice.primary.email.url}">${trim(slice.primary.email.url)}</a><br>
                  <a class="Footer-link" href="tel:${convertToTel(slice.primary.phone)}">${slice.primary.phone}</a>
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
