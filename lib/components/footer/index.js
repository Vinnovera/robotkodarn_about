const html = require('choo/html')
const sheetify = require('sheetify')
sheetify('./index.css')

module.exports = footer

/**
 * Footer component, used on all pages through view component.
 *
 * @param {object} state The whole state of the app
 * @param {function} emit Used to fetch pages from Prismic if necessary
 * @param {string} type I.e. homepage or article, used for color styling
 */
function footer (state, emit, type) {
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
   * Adds CSS modifier to element if page type is article.
   * @param {string} element
   */
  const styles = element => {
    let elementStyle = element

    if (type === 'article') {
      elementStyle += ` ${element}--article`
    }

    return elementStyle
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
    <footer class="${styles('Footer')}">
      <div class="Footer-content">
        <h3 class="u-textM u-textWeightL u-textUppercase u-marginBottomXS">${frameworkDoc.data.footer_title}</h3>
        <p class="u-textS u-marginBottomM">${frameworkDoc.data.footer_summary}</p>
        ${contactDoc.data.body.map(slice => {
          switch (slice.slice_type) {
            case 'company_address': return html`
              <address class="u-textStyleNormal">
                <p class="u-textS">${slice.primary.street_address} | ${slice.primary.postal_code} ${slice.primary.city}</p>
                <p class="u-textS">
                  <a class="${styles('Footer-link')}" href="${slice.primary.email.url}">${trim(slice.primary.email.url)}</a> |
                  <span>${slice.primary.phone}</span>
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
