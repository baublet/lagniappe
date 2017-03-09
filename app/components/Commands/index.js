// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styles from "./Commands.scss"
import CommandWindow from '../CommandWindow'
import CommandTab from '../CommandWindow/CommandTab'
import CommandDragger from './CommandDragger'

class Commands extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            height: 300
        }
    }

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

    windowCount() {
        return !this.props.command ? 0 : this.props.command.windows.length
    }

    resize(y) {
        const newHeight = this.state.height + y
        let height = newHeight > 640 ? 640 : newHeight
        height = newHeight < 100 ? 100 : newHeight
        this.setState({
            height
        })
    }

    render()
    {
        const windows = this.renderWindows()
        const tabs = this.renderTabs()
        const windowCount = this.windowCount()
        const height = this.state.height ? this.state.height : 300
        const heightPx = height + 'px'
        const commandWindowStyle = {
            height: heightPx,
            maxHeight: heightPx
        }

        return (
            <div className={styles.commandsContainer} style={commandWindowStyle}>
                <CommandDragger onResize={this.resize.bind(this)} />
                <h1 className={styles.commandsContainer__header}>Commands ({windowCount})</h1>
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
