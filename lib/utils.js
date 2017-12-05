module.exports = convertToAnchor

function convertToAnchor (str) {
  let anchor = str.replace(/\s/g, '-').toLowerCase()

  anchor = anchor.replace(/å/g, 'a')
  anchor = anchor.replace(/ä/g, 'a')
  anchor = anchor.replace(/ö/g, 'o')
  anchor = anchor.replace(/\?/g, '')

  return anchor
}
