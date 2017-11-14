const y18n = require('y18n')

// Right now, Robotkodarn is only in Swedish
const options = {
  directory: __dirname,
  locale: 'sv'
}

const my18n = module.exports = y18n(options)
