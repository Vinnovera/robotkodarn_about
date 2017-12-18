const html = require('choo/html')
const asElement = require('prismic-element')
const { __ } = require('../../locale')
const pattern = require('../pattern')
const { modifiers } = require('../utils')

module.exports = form
module.exports.loading = loading

/**
 * form component, used on all pages through view component.
 */
function form (state, type, subscribed) {
  const doc = state.pages.find(page => page.type === 'framework')

  return html`
    <section class="${modifiers('Form', { [state.color]: true, [type]: true })}">
      <div class="u-marginBottomL">
        <h2 class="${modifiers('Form-title', { [state.color]: true })}">
          ${doc.data.form_title}
        </h2>
        ${asElement(doc.data.form_content)}
      </div>
      <form onsubmit="${subscribed}" class="${modifiers('Form-aside', { [state.color]: true })}" action="${process.env.MAILCHIMP_ENDPOINT}" method="POST">
        <p class="${modifiers('Form-text', { [state.color]: true })}" class>${doc.data.form_signup_text}</p>
        <input type="hidden" name="u" value="${process.env.MAILCHIMP_USERID}">
        <input type="hidden" name="id" value="${process.env.MAILCHIMP_LISTID}">
        <label class="${modifiers('Form-label', { hidden: true })}" for="MERGE0">${__('Email')}</label>
          <input class="${modifiers('Input', { [state.color]: true })}" type="email" autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" placeholder="${__('Your email')}">
          <button type="submit" class="Button Button--${state.color}" name="submit">${__('Signup')}</button>
      </form>
      ${type !== 'homepage' ? pattern.triangles(state.color) : null}
    </section>
  `
}

function loading (color) {
  return html`
    <form class="Form Form--${color}">
    </form>
  `
}
