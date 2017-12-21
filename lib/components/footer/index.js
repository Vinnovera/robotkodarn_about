const html = require('choo/html')
const { __ } = require('../../locale')
const { convertToTel, trim } = require('../utils')

module.exports = footer

/**
 * Footer component, used on all pages through view component.
 */
function footer (state, color) {
  const doc = state.pages.find(page => page.type === 'framework')

  return html`
    <footer class="Footer Footer--${color}">
      <div class="Footer-content">
        <div class="Footer-summary">
          <h3 class="u-textM u-textWeightL u-textUppercase u-marginBottomM">${doc.data.footer_title}</h3>
          <p class="u-textS u-fontFamilySans u-marginBottomL">${doc.data.footer_summary}</p>
        </div>
        <address class="Footer-address">
          <p class="u-textS u-fontFamilySans">
            <span class="u-textWeightL">${doc.data.company_name}</span><br>
            ${doc.data.street_address}<br>
            ${doc.data.postal_code + ' ' + doc.data.city}<br>
            ${__('Phone')}: <a class="Footer-link u-marginTopM u-inlineBlock" href="tel:${convertToTel(doc.data.phone)}">${doc.data.phone}</a><br>
            ${__('Email')}: <a class="Footer-link Footer-link--expressive" href="${doc.data.email.url}">${trim(doc.data.email.url)}</a>
          </p>
        </address>
      </div>
    </footer>
  `
}
