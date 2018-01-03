const got = require('got')
const Router = require('koa-router')

const router = module.exports = new Router()

router.post('/subscribe', async (ctx, next) => {
  try {
    const endpoint = `https://us17.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LISTID}/members`

    const response = await got.post(endpoint, {
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`
      },
      json: true,
      body: {
        email_address: ctx.request.body.email,
        status: 'subscribed'
      }
    })

    if (!ctx.accepts('html')) {
      ctx.body = response.body
      ctx.type = 'application/json'
    } else {
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
