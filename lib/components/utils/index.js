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
 * TODO: COMMENT!
 */
exports.modifiers = (name, modifiers) => {
  return Object.keys(modifiers).reduce((total, key) => {
    return total + (modifiers[key] ? ` ${name}--${key}` : '')
  }, name)
}
