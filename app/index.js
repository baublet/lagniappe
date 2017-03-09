import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import './app.global.scss'

export const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

// We need to run this here as a require, because we can't properly initialize
// our watchers until our store is initialized
require('./watchers.js')

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
