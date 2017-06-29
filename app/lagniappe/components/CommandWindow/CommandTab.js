import React, { Component } from 'react'
import styles from './CommandWindow.scss'
import { store } from 'index.js'
import { focusWindow, removeWindow } from 'lagniappe/actions/command'

export default class CommandTab extends Component {

    handleMouseDown(e) {
        switch(e.button) {
            case 0:
                return this.focusMe(e)
            case 1:
                return this.removeMe(e)
            case 2:
                e.preventDefault()
                break;
            default:
                return this.focusMe(e)
        }
    }

    focusMe(e) {
        if(this.props.active) return
        store.dispatch(focusWindow(this.props.id))
    }

    removeMe(e) {
        e.preventDefault()
        store.dispatch(removeWindow(this.props.id))
    }

    render() {
        const active = this.props.active ? styles.tabLabelActive : styles.tabLabelInactive
        const finished = this.props.finished ? styles.finished : ''
        const className = styles.tabLabel + ' ' + active + ' ' + finished
        const title = this.props.title
        const windowId = 'window-' + this.props.id
        return (
            <div className={className}>
                {active ? <a className={styles.labelRemove} href="#" onClick={this.removeMe.bind(this)}>x</a> : ''}
                <span className={styles.labelText} onClick={this.focusMe.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>{title}</span>
            </div>
        )
    }
}
