const html = require('choo/html')
const asElement = require('prismic-element')
const { __ } = require('../../locale')
const { modifiers, linkResolver, serialize } = require('../utils')

module.exports = form
module.exports.loading = loading

/**
 * Form component, used on all pages through view component.
 */
function form (state, subscribed) {
  const doc = state.pages.find(page => page.type === 'framework')

  if (!doc) {
    return form.loading()
  }

  return html`
    <section class="Form">
      <div>
        <h2 class="Form-title">
          ${doc.data.form_title}
        </h2>
        ${asElement(doc.data.form_content, linkResolver, serialize('Form'))}
      </div>
      <form onsubmit="${subscribed}" class="Form-aside" action="${process.env.MAILCHIMP_ENDPOINT}" method="POST">
        <h3 class="Form-heading3">
          ${doc.data.form_signup_title}
        </h3>
        <p class="Form-text" class>
          ${doc.data.form_signup_text}
        </p>
        <input type="hidden" name="u" value="${process.env.MAILCHIMP_USERID}">
        <input type="hidden" name="id" value="${process.env.MAILCHIMP_LISTID}">
        <label class="${modifiers('Form-label', { hidden: true })}" for="MERGE0">${__('Email')}</label>
          <input class="Input" type="email" autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" placeholder="${__('Your email')}">
          <button type="submit" class="Button Button--inverted" name="submit">${__('Signup')}</button>
      </form>
    </section>
  `
}

/**
 * Displayed while waiting for content to load from CMS
 */
function loading () {
  return html`
    <section class="Form">
    <div>
      <h2 class="Form-title Form-title--loading">${__('Loading')}</h2>
      <p class="Form-paragraph">
        <span class="Form-paragraph--loading">${__('Loading text')}</span>
      </p>
    </div>
    <div class="Form-aside Form-aside--loading">
      <h3 class="Form-heading3 Form-heading3--loading">${__('Loading')}</h3>
      <p class="Form-text"><span class="Form-text--loading">${__('Loading introduction text')}</span></p>
        <div class="Input Input--loading">${__('Loading')}</div>
        <button class="Button Button--inverted Button--loading">
          ${__('Loading button')}
        </button>
    </div>
  </section>
  `
}
