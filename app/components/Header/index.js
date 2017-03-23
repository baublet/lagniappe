import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Header.scss'

import { Icon, Tooltip } from 'antd'

export default class Header extends Component {

    internetStatus() {
        const type = this.props.watchers.internet_connected ? "link" : "disconnect"
        const title = this.props.watchers.internet_connected ? "You are connected to the internet" : "You have no internet connectivity"
        return (
            <Tooltip placement="bottomRight" title={title}>
                <Icon type={type} />
            </Tooltip>
        )
    }

    render() {
        return (
            <div className={styles.header}>
                <Link to="/" className="header__logo">DevOps Tool</Link>
                <div className="devopsHealth">
                    {this.internetStatus()}
                </div>
            </div>
        )
    }
}
