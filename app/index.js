import React                    from 'react'
import { render }               from 'react-dom'
import { Provider }             from 'react-redux'
import { Router, hashHistory }  from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes                   from 'routes'
import configureStore           from 'lagniappe/store/configureStore'
import { LocaleProvider }       from 'antd'
import enUS                     from 'antd/lib/locale-provider/en_US'
import './app.global.scss'

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
