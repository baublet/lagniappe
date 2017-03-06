import React, { Component } from 'react'
import styles from './CommandWindow.scss'
import { store } from '../../index.js'
import { focusWindow, removeWindow } from '../../actions/command'

export default class CommandTab extends Component {

    focusMe() {
        if(this.props.active) return
        store.dispatch(focusWindow(this.props.id))
    }

    removeMe(e) {
        e.preventDefault()
        store.dispatch(removeWindow(this.props.id))
    }

    render() {
        const active = this.props.active ? styles.tabLabelActive : styles.tabLabelInactive
        const className = styles.tabLabel + ' ' + active
        const title = this.props.title
        const windowId = 'window-' + this.props.id
        return (
            <div className={className}>
                {active ? <a className={styles.labelRemove} href="#" onClick={this.removeMe.bind(this)}>x</a> : ''}
                <span className={styles.labelText} onClick={this.focusMe.bind(this)}>{title}</span>
            </div>
        )
    }
}
