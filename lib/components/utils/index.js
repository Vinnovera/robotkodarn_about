const html = require('choo/html')
const { Elements } = require('prismic-richtext')

/**
 * Converts string i.e. title to a string that is safe to use as an id on page
 * @param {string} str
 * @return {string} id
 */
exports.convertToId = str => {
  let id = str.replace(/\s/g, '-').toLowerCase()

  id = id.replace(/å/g, 'a')
  id = id.replace(/ä/g, 'a')
  id = id.replace(/ö/g, 'o')
  id = id.replace(/\?/g, '')

  return id
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

    case Elements.paragraph: {
      /* Return the strings that begins and ends with quotation marks */
      const blockquote = children.filter((child, index) => {
        return typeof child === 'string' && child.match(/^".*?"$/)
      })

      /**
       * Check if first child of paragraph is a blockquote.
       * If true, return a blockquote instead of a normal paragraph
       */
      if (children[0] === blockquote[0]) {
        return html`
          <blockquote class="${className}-quote">${children}</blockquote>
        `
      }

      return html`
        <p class="${className}-paragraph">${children}</p>
      `
    }

    case Elements.oList: return html`
      <ol class="${className}-list">${children}</ol>
    `

    case Elements.list: return html`
      <ul class="${className}-list">${children}</ul>
    `

    case Elements.oListItem: return html`
      <li class="${className}-listitem">${children}</li>
    `

    case Elements.listItem: return html`
      <li class="${className}-listitem">${children}</li>
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

exports.icon = (type, svgClass, color) => {
  return html`
    <svg class="${svgClass} ${svgClass + '--' + color}" viewBox="0 0 30 30" width="30" height="30">
      <circle cx="15" cy="15" r="15" transform="rotate(180 15 15)" fill="currentColor"/>
      ${type === 'expand' ? html`<path fill="#FFF" fill-rule="nonzero" d="M22 17v-3.7h-5v-5h-3.7v5h-5V17h5v5H17v-5z"/>` : null}
      ${type === 'implode' ? html`<path fill="#FFF" d="M8 13h15v4H8z"/>` : null}
    </svg>
  `
}

/**
 * Takes an image object and returns markup with
 * srcset and sizes.
 * @param {object} image The object retrieved from CMS
 * @param {string} style The base name of component, used for styling
 */
exports.renderImage = (image, style) => {
  return html`
    <img
      class="${style}-image"
      src="${image.md_800.url}"
      alt=${image.alt}
      srcset="${image.url} 300w,
      ${image.sm_600.url} 600w,
      ${image.md_800.url} 800w,
      ${image.lg_1600.url} 1600w,
      ${image.xl_2400.url} 2400w"
      sizes="(min-width: 800px) 800w"
    />
  `
}
