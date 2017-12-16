const y18n = require('y18n')

const lang = { sv: require('./sv') }

/**
 * 1. Trying to update client side will cause error
 */
const options = {
  directory: __dirname,
  locale: process.env.ROBOTKODARN_LANG,
  updateFiles: typeof window === 'undefined' // 1.
}

const my18n = module.exports = y18n(options)

/**
 * Do not try to read from file from client since this wont work.
 */
if (typeof window !== 'undefined') {
  my18n._readLocaleFile = function () {
    this.cache[this.locale] = lang[this.locale]
  }
}
