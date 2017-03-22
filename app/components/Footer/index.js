// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Footer.scss'

export default class Footer extends Component {
  render() {
    return (
        <div className={styles.footer} id="footer">
            This is in the footer
        </div>
    )
  }
}
