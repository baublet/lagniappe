// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styles from "./Commands.scss"
import CommandWindow from '../CommandWindow'
import CommandTab from '../CommandWindow/CommandTab'

class Commands extends Component
{

    renderWindows() {
        if(!this.props.command || !this.props.command.windows.length) return <strong></strong>
        return this.props.command.windows.map(window => {
            return <CommandWindow title={window.windowTitle} lines={window.lines} key={window.id} active={window.active} />
        })
    }

    renderTabs() {
        if(!this.props.command || !this.props.command.windows.length) return <strong></strong>
        return this.props.command.windows.map(window => {
            return <CommandTab title={window.windowTitle} key={'tab-' + window.id} id={window.id} active={window.active} finished={window.finished} />
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
                <div className={styles.commandsContainer__tabsContainer}>
                    {tabs}
                </div>
                {windows}
            </div>
        )
    }

}

function mapStateToProps(state) {
   return {
       command: state.command
   }
}

export default connect(mapStateToProps)(Commands)
