import { proxy, subscribe } from 'valtio'

const getInitialState = () => {
  try {
    const state = JSON.parse(<string>localStorage.getItem('pipedState'))
    if (state) return state
  } catch (e) {
    console.log(e)
  }

  return {
    version: '0.1.0',
    apiUrl: 'https://api.piped.silkky.cloud',
    authenticated: false,
    authToken: '',
    theme: 'light',
  }
}

export const state = proxy(getInitialState())

subscribe(state, () => {
  localStorage.setItem('pipedState', JSON.stringify(state))
})

export default state
