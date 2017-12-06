
const menu = require('./menu')
const pages = require('./pages')
const sections = require('./sections')

/**
 * Gather all store items and combine them to one single store.
 */
module.exports = function () {
  return (state, emitter) => {
    menu(state, emitter)
    pages(state, emitter)
    sections(state, emitter)
  }
}
