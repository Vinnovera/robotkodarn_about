const Prismic = require('prismic-javascript')

module.exports = pages

function pages (state, emitter) {
  // Initial state
  state.pages = state.pages || {
    items: [],
    loading: false
  }

  emitter.on('pages:fetch', (ids) => {
    // While fetching content, pagesLoading is set to true
    state.pages.loading = true
    emitter.emit('render')

    Prismic.api(process.env.PRISMIC_ENDPOINT).then(api => {
      return api.getByIDs(ids).then(response => {
        state.pages.items = state.pages.items.concat(response.results)

        state.pages.loading = false
        emitter.emit('render')
      })
    }).catch(err => {
      state.pages.loading = false
      emitter.emit('error', err)
    })
  })
}
