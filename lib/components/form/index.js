const html = require('choo/html')
const asElement = require('prismic-element')
const { __ } = require('../../locale')
const { linkResolver, modifiers, serialize } = require('../utils')

module.exports = form
module.exports.loading = loading

/**
 * Form component, used on all pages through view component.
 */
function form (state, callback) {
  const doc = state.pages.find(page => page.type === 'framework')
  const { error, fade, loading, status } = state.subscription

  if (!doc) {
    return form.loading()
  }

  const onSubmit = event => {
    // Only send valid form data
    if (event.target.checkValidity()) {
      callback(new window.FormData(event.target))
    }
    event.preventDefault()
  }

  return html`
    <section class="Form">
      <div class="Form-content">
        <div>
          <h2 class="Form-title">
            ${doc.data.form_title}
          </h2>
          ${asElement(doc.data.form_content, linkResolver, serialize('Form'))}
        </div>
        <form class="Form-aside" action="/subscribe" method="POST" onsubmit=${onSubmit}>
          <h3 class="Form-heading3">
            ${doc.data.form_signup_title}
          </h3>
          <p class="Form-text">
            ${doc.data.form_signup_text}
          </p>
          <label class="u-textXS u-fontFamilySans u-marginBottomS u-textWeightL" for="email">${__('Email')}</label>
            <input class="Input" type="email" name="email" id="email" size="25" placeholder="${__('example@address.com')}" required>
            ${button(loading)}
            ${feedback(error, fade, status)}
        </form>
      </div>
    </section>
  `
}

const button = loading => {
  const style = modifiers('Button', { form: true, disabled: loading })

  if (loading) {
    return html`
      <button disabled="disabled" type="submit" class="${style} u-marginTopM" name="submit">
        <div class="Button-spinner">
          <div class="Button-spinner1"></div>
          <div class="Button-spinner2"></div>
          <div class="Button-spinner3"></div>
        </div>
      </button>
    `
  }

  return html`
    <button type="submit" class="${style} u-marginTopM" name="submit">
      ${__('Signup')}
    </button>
  `
}

const feedback = (error, fade, status) => {
  const style = modifiers('Form-feedback', { fade: fade })

  if (error || status) {
    const content = error ? __('Something went wrong.') : __('You are now subscribing.')
    return html`<p class="${style}">${content}</p>`
  }
}

/**
 * Displayed while waiting for content to load from CMS
 */
function loading () {
  return html`
    <section class="Form">
      <div class="Form-content">
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
      </div>
    </section>
  `
}
