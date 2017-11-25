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
    "plugin/selector-bem-pattern": {
      "preset": "suit"
    }
  }
}
