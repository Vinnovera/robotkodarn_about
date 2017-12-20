const html = require('choo/html')
const { __ } = require('../../locale')
const { convertToTel, trim } = require('../utils')

module.exports = address

/**
 * Address component, used on contact page
 * TODO: make this reusable, i.e. in footer component
 */
function address (content) {
  return html`
    <address class="Address">
      <p class="Address-content">
        <span class="Address-name">${content.company_name}</span><br>
        ${content.street_address}<br>
        ${content.postal_code + ' ' + content.city}<br>
        ${__('Phone')}: <a class="Address-link Address-link--nostyle" href="tel:${convertToTel(content.phone)}">${content.phone}</a><br>
        ${__('Email')}: <a class="Address-link" href="${content.email.url}">${trim(content.email.url)}</a>
      </p>
    </address>
  `
}
