import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Apps from './components/Apps'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/apps" component={Apps} />
  </Route>
)
