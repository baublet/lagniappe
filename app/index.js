import React                    from 'react'
import { render }               from 'react-dom'
import { Provider }             from 'react-redux'
import { Router, hashHistory }  from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes                   from 'routes'
import configureStore           from 'lagniappe/store/configureStore'
import { LocaleProvider }       from 'antd'
import enUS                     from 'antd/lib/locale-provider/en_US'
import config                   from 'config'
import './app.global.scss'

// Here's where we store our processes so we can kill them later
config.processes = {}

export const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

// We need to run this here as a require, because we can't properly initialize
// our watchers until our store is initialized
require('./watchers.js')

render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
        <Router history={history} routes={routes} />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)
