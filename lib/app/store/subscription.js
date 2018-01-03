module.exports = subscription

function subscription (state, emitter) {
  state.subscription = {
    loading: false,
    status: undefined,
    error: null
  }

  emitter.on('subscribe', data => {
    state.subscription.loading = true
    emitter.emit('render')

    /* Convert formData to regular object */
    const body = [...data.entries()].reduce((query, [key, value]) => {
      query[key] = value
      return query
    }, {})

    window.fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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

  /**
   * Add or remove element to list of expanded article sections if
   * user expand or collapse it.
   */
  emitter.on('toggle-section', id => {
    const index = state.expanded.indexOf(id)

    if (index === -1) {
      state.expanded.push(id)
    } else {
      state.expanded.splice(index, 1)
    }
    emitter.emit('render')
  })
}
