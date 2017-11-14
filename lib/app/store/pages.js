const Prismic = require('prismic-javascript')

module.exports = pages

function pages (state, emitter) {
  state.pages = state.pages || []

  emitter.on('pages:fetch', options => {
    Prismic.api(process.env.PRISMIC_ENDPOINT).then(api => {
      let query
      if (options.single) {
        query = api.getSingle(options.single)
      }

      return query.then(response => {
        state.pages.push(response)
        emitter.emit('render')
      })
    }).catch(err => {
      emitter.emit('error', err)
    })
  })
}