// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Header.scss'

export default class Header extends Component {

    internetStatus() {
        const style = { color: this.props.watchers.internet_connected ? "green" : "rgba(0, 0, 0, .25)" }
        const title = this.props.watchers.internet_connected ? "You are connected to the internet" : "You have no internet connectivity"
        return (
            <i className="fa fa-plug" aria-hidden="true" style={style} title={title}></i>
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
