// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styles from "./Commands.scss"
import CommandWindow from '../CommandWindow'
import CommandTab from '../CommandWindow/CommandTab'
import { Button }           from 'antd'

class Commands extends Component
{

    handleKill()
    {
        if(config.processes[this.props.id])
        {
            config.processes[this.props.id].kill()
        }
    }

    renderWindows()
    {
        if(!this.props.commands || !this.props.commands.windows.length) return <strong></strong>
        return this.props.commands.windows.map(window => {
            return <CommandWindow title={window.windowTitle} lines={window.lines} id={window.id} key={window.id} active={window.active} finished={window.finished} />
        })
    }

    renderTabs()
    {
        if(!this.props.commands || !this.props.commands.windows.length) return <strong></strong>
        return this.props.commands.windows.map(window => {
            return <CommandTab title={window.windowTitle} key={window.id} id={window.id} active={window.active} finished={window.finished} />
        })
    }

    render()
    {
        const windows = this.renderWindows()
        const tabs = this.renderTabs()
        const id = this.props.id ? this.props.id : 'console'
        const style = this.props.style ? this.props.style : {}

        return (
            <div className={styles.commandsContainer} id={id} style={style}>
                <div className={styles.tabsContainer}>
                    {tabs}
                </div>
                {windows}
            </div>
        )
    }

}

export default Commands
