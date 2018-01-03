const got = require('got')
const Router = require('koa-router')

const router = module.exports = new Router()

/**
 * A route that handles the subscribe form. The route sends provided
 * email address to Mailchimp as JSON (the only format Mailchimp supports).
 *
 * http://developer.mailchimp.com/documentation/mailchimp/reference/overview/
 */
router.post('/subscribe', async (ctx, next) => {
  try {
    // us17 is the datacenter in use
    const endpoint = `https://us17.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LISTID}/members`

    /**
     * If request is sent as form data, the email will be available on
     * fields object.
     */
    const email = ctx.request.body.fields ? ctx.request.body.fields.email
    : ctx.request.body.email

    // got provides a nicer interface to the built-in http module.
    const response = await got.post(endpoint, {
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`
      },
      json: true,
      body: {
        email_address: email,
        status: 'subscribed'
      }
    })

    if (!ctx.accepts('html')) {
      ctx.body = response.body
      ctx.type = 'application/json'
    } else {
      // Will happen when javascript is disabled in browser
      ctx.redirect(ctx.get('referer'))
    }
  } catch (err) {
    if (!ctx.accepts('html')) {
      ctx.status = 400
      ctx.type = 'application/json'
    } else {
      ctx.throw(400, err.message)
    }
  }
})
