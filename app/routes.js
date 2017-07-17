import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App               from 'lagniappe/components/App'
import Home              from 'lagniappe/components/Home'
import Apps              from 'lagniappe/components/Apps'
import Config            from 'lagniappe/components/Config'
import Docker            from 'lagniappe/components/Docker'
import Git               from 'lagniappe/components/Git'
import Leaderboard       from 'lagniappe/components/Git/Leaderboard'
import Documentation     from 'lagniappe/components/Documentation'
import DocumentationPage from 'lagniappe/components/Documentation/Page'
import Jira              from 'lagniappe/components/Jira'
import Browse            from 'lagniappe/components/Jira/Browse'
import IssuePage         from 'lagniappe/components/Jira/IssuePage'
import Valet             from 'lagniappe/components/Valet'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/config" component={Config} />
    <Route path="/apps" component={Apps} />
    <Route path="/docker" component={Docker} />
    <Route path="/jira" component={Jira}>
        <IndexRoute component={Browse} />
        <Route path="/jira/*" component={IssuePage} />
    </Route>
    <Route path="/git">
        <IndexRoute component={Git} />
        <Route path="leaderboard" component={Leaderboard} />
    </Route>
    <Route path="/valet" component={Valet} />
    <Route path="/docs">
        <IndexRoute component={Documentation} />
        <Route path="/docs/*" component={DocumentationPage} />
    </Route>
  </Route>
)
