const html = require('choo/html')
const { asText } = require('prismic-richtext')
const pattern = require('../components/pattern')
const heading = require('../components/heading')
const textblock = require('../components/textblock')
const view = require('../components/view')

module.exports = article

function article (state, emit) {
  const route = state.href.substr(1) // Remove slash in beginning of string
  const doc = state.pages.find(page => page.uid === route)

  if (!doc) {
    emit('pages:fetch', { article: route })
    return view(state, emit, 'blue', html`
      <div class="App-article">
        ${heading.loading()}
        ${pattern('article')}
      </div>
    `)
  } else {
    emit(state.events.DOMTITLECHANGE, asText(doc.data.title))
  }

  return view(state, emit, 'article', html`
    <div class="App-article">
      <section class="App-article-intro">
        ${heading(doc.data.title)}
        <p>${doc.data.introduction}</p>
        ${doc.data.body.map(slice => {
          switch (slice.slice_type) {
            case 'text': return html`
              ${slice.primary.subtitle}
            `
            default: return null
          }
        })}
        ${pattern('article')}
      </section>
      ${doc.data.body.map(slice => {
        switch (slice.slice_type) {
          case 'text': return textblock(slice.primary)
          default: return null
        }
      })}
    </div>
  `
  )
}
