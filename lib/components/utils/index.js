const html = require('choo/html')
const { Elements } = require('prismic-richtext')

/**
 * Converts section title to string that can be used as an anchor link
 * @param {string} title
 * @return {string} anchor
 */
exports.convertToAnchor = title => {
  let anchor = title.replace(/\s/g, '-').toLowerCase()

  anchor = anchor.replace(/å/g, 'a')
  anchor = anchor.replace(/ä/g, 'a')
  anchor = anchor.replace(/ö/g, 'o')
  anchor = anchor.replace(/\?/g, '')

  return anchor
}

/**
 * Takes target anchor link and scrolls it into view.
 * scrollIntoView is supported natively by Chrome and Firefox.
 * @param {object} event
 */
exports.scrollToAnchor = event => {
  const id = event.target.hash.replace(/#/g, '')
  const element = document.getElementById(id)

  element.scrollIntoView({ block: 'start', behavior: 'smooth' })
  event.preventDefault()
}

/**
 * Gets viewport height
 * @return {Number}
 */
const vh = () => (
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
)

/**
 * Checks if element has entered the viewport
 * @param {string} element The element to be evaluated
 * @return {Boolean}
 */
exports.hasEntered = element => {
  if ((window.scrollY + vh()) > element.offsetTop && element.offsetTop !== 0) {
    return true
  }
  return false
}

/**
 * Takes a class name and adds modifiers to it
 */
exports.modifiers = (name, modifiers) => {
  return Object.keys(modifiers).reduce((total, key) => {
    return total + (modifiers[key] ? ` ${name}--${key}` : '')
  }, name)
}

exports.linkResolver = (doc) => {
  return '/' + doc.uid
}

exports.serialize = className => (element, content, children) => {
  switch (element.type) {
    case Elements.heading1: return html`
      <h1 class="${className}-heading">${children}</h1>
    `
    case Elements.heading2: return html`
      <h2 class="${className}-heading2">${children}</h2>
    `
    case Elements.heading3: return html`
      <h3 class="${className}-heading3">${children}</h3>
    `
    case Elements.hyperlink: return html`
      <a class="${className}-link" href="${element.data.url}">${children}</a>
    `
    case Elements.paragraph: return html`
      <p class="${className}-paragraph">${children}</p>
    `
    case Elements.em: return html`
      <em class="${className}-quote">${children}</em>
    `
    default: return null
  }
}

/**
 * Removes spaces and hyphens.
 * @param {string} str
 */
exports.convertToTel = str => {
  let tel = str.replace(/\s/g, '')
  tel = tel.replace(/-/g, '')
  return tel
}

/**
 * Removes everything in a string up until a colon
 * (including the colon).
 * @param {string} url
 */
exports.trim = url => {
  const trimmed = url.replace(/^(.*):/, '')
  return trimmed
}
