module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-flexboxfixer'),
    require('postcss-custom-properties'),
    require('postcss-custom-media'),
    require('autoprefixer'),
    require('cssnano')
  ]
}
