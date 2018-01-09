module.exports = subscription

function subscription (state, emitter) {
  // Initial state
  state.subscription = {
    error: null,
    fade: false,
    loading: false,
    status: undefined
  }

  emitter.on('subscribe', data => {
    // Reset state, but set loading to true
    state.subscription = {
      error: null,
      fade: false,
      loading: true,
      status: undefined
    }

    emitter.emit('render')

    // Post to subscribe route and handle response accordingly
    window.fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: data
    }).then(response => { return response.json() }).then(body => {
      /**
       * If status is not subscribed, something went
       * wrong during subscription process.
       */
      if (body.status !== 'subscribed') {
        state.subscription = {
          error: true,
          loading: false,
          status: body.status
        }
      } else {
        state.subscription = {
          loading: false,
          status: body.status
        }
      }

      emitter.emit('render')
    })
    .catch(err => {
      state.subscription = {
        loading: false,
        error: true,
        status: err.message
      }

      emitter.emit('render')
    })
    // Fade out
    .then(() => {
      window.setTimeout(() => {
        state.subscription.fade = true
        emitter.emit('render')
      }, 4000)
    })
  })
}
