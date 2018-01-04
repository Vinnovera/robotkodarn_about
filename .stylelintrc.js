module.exports = {
  "plugins": [
    "stylelint-selector-bem-pattern"
  ],
  "extends": "stylelint-config-suitcss",
  "ignoreFiles": [
    "public/**",
    "node_modules/**"
  ],
  "rules": {
    "property-no-vendor-prefix": null,
    "plugin/selector-bem-pattern": {
      "preset": "suit",
      "ignoreSelectors": /^\.has-js/
    }
  }
}
