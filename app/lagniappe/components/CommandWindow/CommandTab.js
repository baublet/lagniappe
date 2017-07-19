import React, { Component }          from 'react'
import styles                        from './CommandWindow.scss'
import { store }                     from 'index.js'
import { focusWindow, removeWindow } from 'lagniappe/actions/command'
import config                        from 'config'
import { Spin, Icon }                from 'antd'
import electron                      from 'electron'

const ElectronMenu = electron.remote.Menu

export default class CommandTab extends Component
{

    handleMouseDown(e)
    {
        switch(e.button) {
            case 0:
                return this.handleFocus(e)
            case 1:
                return this.handleRemove(e)
            case 2:
                e.preventDefault()
                break;
            default:
                return this.handleFocus(e)
        }
    }

    contextMenu()
    {
        const menu = [{
            label: 'Close Tab',
            click: this.handleRemove.bind(this)
        }]
        if(!this.props.finished)
        {
            menu.push({
                label: 'Stop Command',
                click: this.handleKill.bind(this)
            })
        }
        return ElectronMenu.buildFromTemplate(menu)
    }

    handleContext(e)
    {
        e.preventDefault()
        this.contextMenu().popup()
    }

    handleFocus()
    {
        if(this.props.active) return null
        store.dispatch(focusWindow(this.props.id))
    }

    handleRemove(e)
    {
        const id = this.props.id
        if(e && e.preventDefault) e.preventDefault()
        store.dispatch(removeWindow(id))
        // Kill and remove any processes related to this window
        if(config.processes[id])
        {
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
        const mouseDownHandler = this.handleMouseDown.bind(this)
        const focusHandler = this.handleFocus.bind(this)
        const removeHandler = this.handleRemove.bind(this)
        const contextMenuHandler = this.handleContext.bind(this)

        return (
            <div className={className}>
                {active ? <a className={styles.labelRemove} href="#" onClick={removeHandler}><Icon type="close" /></a> : ''}
                <span className={styles.labelText} onClick={focusHandler}
                        onMouseDown={mouseDownHandler}
                        onContextMenu={contextMenuHandler}>
                    {!finished ? <Spin size="small" className="r-spacing--small" onMouseDown={killHandler} /> : false}
                    {title}
                </span>
            </div>
        )
    }

}
