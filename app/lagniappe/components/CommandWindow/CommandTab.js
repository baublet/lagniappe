import React, { Component } from 'react'
import styles from './CommandWindow.scss'
import { store } from 'index.js'
import { focusWindow, removeWindow } from 'lagniappe/actions/command'
import config from 'config'
import { Spin, Icon } from 'antd'

export default class CommandTab extends Component
{

    handleMouseDown(e)
    {
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

    focusMe(e)
    {
        if(this.props.active) return null
        store.dispatch(focusWindow(this.props.id))
    }

    removeMe(e)
    {
        const id = this.props.id
        e.preventDefault()
        store.dispatch(removeWindow(id))
        // Kill and remove any processes related to this window
        if(config.processes[id])
        {
            console.log('Killing all processes associated with window ID ' + id)
            config.processes[id].kill()
            delete config.processes[id]
        }
    }

    handleKill()
    {
        const id = this.props.id
        const active = this.props.active
        if(active && config.processes[id])
        {
            config.processes[id].kill()
        }
    }

    render()
    {
        const finished = !!this.props.finished
        const active = this.props.active
        const activeClass = active ? styles.tabLabelActive : styles.tabLabelInactive
        const finishedClass = this.props.finished ? styles.finished : ''
        const className = styles.tabLabel + ' ' + activeClass + ' ' + finishedClass
        const title = this.props.title
        const windowId = this.props.id
        const killHandler = active ? this.handleKill.bind(this) : () => {}

        return (
            <div className={className}>
                {active ? <a className={styles.labelRemove} href="#" onClick={this.removeMe.bind(this)}><Icon type="close" /></a> : ''}
                <span className={styles.labelText} onClick={this.focusMe.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>
                    {!finished ? <Spin size="small" className="r-spacing--small" onMouseDown={killHandler} /> : false}
                    {title}
                </span>
            </div>
        )
    }

}
