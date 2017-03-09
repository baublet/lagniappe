// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Header.scss'

export default class Header extends Component {
  render() {
    return (
        <div className={styles.header}>
            <Link to="/" className="header__logo">DevOps Tool</Link>
            <div className="devopsHealth">
                Health Metrics
            </div>
        </div>
    )
  }
}
