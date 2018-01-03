module.exports = subscription

function subscription (state, emitter) {
  // Initial state
  state.subscription = {
    loading: false,
    status: undefined,
    error: null
  }

  emitter.on('subscribe', data => {
    state.subscription.loading = true

    emitter.emit('render')

    // Post to subscribe route and handle response accordingly
    window.fetch('/subscribe', {
      method: 'POST',
      body: data
    }).then(response => {
      if (response.status !== 200) {
        throw new Error('Subscription failed')
      }

      return response.json().then(body => {
        state.subscription = {
          loading: false,
          status: body.status
        }

        emitter.emit('render')
      })
    }).catch(() => {
      state.subscription = {
        loading: false,
        error: true
      }
      emitter.emit('render')
    })
  })
}
