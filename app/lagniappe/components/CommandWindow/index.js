import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import styles               from './CommandWindow.scss'
import config               from 'config'
import { Button }           from 'antd'

export default class CommandWindow extends Component
{
    scrollToBottom()
    {
        const node = ReactDOM.findDOMNode(this.consoleBottom)
        // This will be false if we're not currently rendering this window
        if(!node) return
        node.scrollIntoView({behavior: "smooth"})
    }

    componentDidMount()
    {
        this.scrollToBottom()
    }

    componentDidUpdate(prevProps, prevState)
    {
        // Only scroll to the bottom if new lines were added
        if(this.props.lines.length > prevProps.lines.length)
            this.scrollToBottom()
    }

    handleContext(e)
    {
        console.log(e)
        console.log(config.processes)
        e.preventDefault()
    }

    handleKill()
    {
        if(config.processes[this.props.id])
        {
            config.processes[this.props.id].kill()
        }
    }

    renderLines()
    {
        let lines = []
        let i = 0
        return this.props.lines.map( line => <li key={this.props.id + '' + parseInt(i++, 10)} className={styles.line}>{line}</li> )
    }

    render()
    {
        if(!this.props.active) return false
        const title = this.props.title
        const lines = this.renderLines()
        const windowId = this.props.id
        const contextHandler = this.handleContext

        return (
            <div id={windowId} className={styles.commandWindow} onContextMenu={contextHandler.bind(this)}>
                <ol className={styles.lines}>
                    {lines}
                </ol>
                <div style={ {float:"left", clear: "both"} }
                    ref={(el) => { this.consoleBottom = el }}>
                </div>
            </div>
        )
    }
}
