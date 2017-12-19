const html = require('choo/html')
const { asText } = require('prismic-richtext')
const textblock = require('../components/textblock')
const team = require('../components/team')
const createView = require('../components/view')
const hero = require('../components/hero')

module.exports = createView('article', article)

function article (state, emit) {
  const pathname = state.href.substr(1) // Remove slash in beginning of string
  const doc = state.pages.find(page => page.uid === pathname)

  if (!doc) {
    emit('pages:fetch', { article: pathname })
    return html`
      <div class="App App--left">
        ${hero.loading({ pageType: state.pageType, color: state.color })}
        ${textblock.loading()}
        ${textblock.loading()}
        ${textblock.loading()}
      </div>
    `
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return html`
    <div class="App App--left">
      ${hero(doc, { color: state.color, pageType: state.pageType })}
      ${doc.data.body.map(slice => {
        switch (slice.slice_type) {
          case 'text': return textblock(slice.primary, state.color, emit, state.expanded)
          case 'team': return team(slice, state.color)
          default: return null
        }
      })}
    </div>
  `
}
