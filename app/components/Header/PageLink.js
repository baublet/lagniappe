// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './PageLink.scss'

class PageLink extends Component {

  render() {
    const isActive = this.context.router.isActive(this.props.to, true),
          className = isActive ? styles.pageLink + ' ' + styles.active : styles.pageLink
    return (
        <Link {...this.props} className={className}>
            {this.props.children}
        </Link>
    )
  }

}

PageLink.contextTypes = {
  router: React.PropTypes.object
}

export default PageLink
