import React, { Component } from 'react'
import styles from './CommandWindow.scss'

export default class CommandWindow extends Component {

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
            </div>
        )
    }
}
