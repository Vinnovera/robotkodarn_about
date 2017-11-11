const Prismic = require('prismic-javascript')

module.exports = pages

function pages (state, emitter) {
  emitter.on('pages:fetch', async options => {
    const api = await Prismic.api(process.env.PRISMIC_ENDPOINT)

    let response
    if (options.single) {
      response = [await api.getSingle(options.single)]
    }

    state.pages.push(...response)
    emitter.emit('render')
  })
}
