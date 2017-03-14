import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Panel.scss'

class Heading extends Component {

    render() {
        return (
            <h2 className={styles.panelHeading}>
                {this.props.children}
            </h2>
        )
    }

}

export default Heading
