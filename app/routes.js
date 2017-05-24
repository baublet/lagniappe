import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App               from 'components/App'
import Home              from 'components/Home'
import Apps              from 'components/Apps'
import Config            from 'components/Config'
import Docker            from 'components/Docker'
import Git               from 'components/Git'
import Leaderboard       from 'components/Git/Leaderboard'
import Documentation     from 'components/Documentation'
import DocumentationPage from 'components/Documentation/Page'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/config" component={Config} />
    <Route path="/apps" component={Apps} />
    <Route path="/docker" component={Docker} />
    <Route path="/git">
        <IndexRoute component={Git} />
        <Route path="leaderboard" component={Leaderboard} />
    </Route>
    <Route path="/docs">
        <IndexRoute component={Documentation} />
        <Route path="/*" component={DocumentationPage} />
    </Route>
  </Route>
)
