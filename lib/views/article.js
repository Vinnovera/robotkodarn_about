const html = require('choo/html')
const { asText } = require('prismic-richtext')
const section = require('../components/section')
const team = require('../components/team')
const createView = require('../components/view')
const hero = require('../components/hero')

module.exports = createView('article', article)

/**
 * View rendered on article pages
 *
 * @param {object} state
 * @param {function} emit
 */
function article (state, emit) {
  const pathname = state.href.substr(1) // Remove slash in beginning of string
  const doc = state.pages.items.find(page => page.uid === pathname)

  /**
  * Show loading component while content is being fetched from CMS.
  * Normally, this will not happen, but it could if a user navigates
  * between pages before all are are available on state.
  */
  if (!doc && state.pages.loading) {
    return html`
      <div>
        ${hero.loading({ pageType: state.pageType, color: state.color })}
        ${section.loading()}
        ${section.loading()}
        ${section.loading()}
      </div>
    `
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return html`
    <div class="App">
      ${hero(doc, { color: state.color, pageType: state.pageType })}
      ${doc.data.body.map(slice => {
        if (!slice.primary.title) {
          return
        }

        switch (slice.slice_type) {
          case 'text': return section(state, emit, slice, state.pageType)
          case 'team': return team(state.color, slice)
          default: return null
        }
      })}
    </div>
  `
}
