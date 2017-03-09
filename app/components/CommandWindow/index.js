import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './CommandWindow.scss'

export default class CommandWindow extends Component {

    scrollToBottom() {
        const node = ReactDOM.findDOMNode(this.consoleBottom)
        // This will be false if we're not currently rendering this window
        if(!node) return
        node.scrollIntoView({behavior: "smooth"})
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    renderLines() {
        let lines = []
        let i = 0
        return this.props.lines.map( line => <li key={this.props.id + '' + parseInt(i++, 10)} className={styles.line}>{line}</li> )
    }

    render() {
        if(!this.props.active) return <div className="screenReaderText"></div>
        const title = this.props.title
        const lines = this.renderLines()
        const windowId = 'window-' + this.props.id
        return (
            <div id={windowId} className={styles.commandWindow}>
                <ol className={styles.lines}>
                    {lines}
                </ol>
                <div style={ {float:"left", clear: "both"} }
                    ref={(el) => { this.consoleBottom = el }}></div>
            </div>
        )
    }
}
