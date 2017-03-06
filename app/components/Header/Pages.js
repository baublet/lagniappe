// @flow
import React, { Component } from 'react'
import PageLink from './PageLink'

import styles from './Pages.scss'

class Pages extends Component {
    getChildContext() {
      return {router: this.props.router}
    }

    render() {
      return (
        <div className={styles.header__pages}>
            <PageLink to="/">Main</PageLink>
            <PageLink to="/apps">Apps</PageLink>
            <PageLink to="/email">Email</PageLink>
            <PageLink to="/testing">Testing</PageLink>
            <PageLink to="/git">Git</PageLink>
            <PageLink to="/tools">Tools</PageLink>
        </div>
      )
    }
}

Pages.childContextTypes = {
  router: React.PropTypes.object
}

export default Pages
