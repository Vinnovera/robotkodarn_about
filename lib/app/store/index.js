
const menu = require('./menu')
const pages = require('./pages')

/**
 * Gather all store items and combine them to one single store.
 */
module.exports = function () {
  return (state, emitter) => {
    pages(state, emitter)
    menu(state, emitter)
  }
}
