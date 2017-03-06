import React, { Component } from 'react'
import styles from './Commands.scss'

export default class CommandDragger extends Component {

    constructor(props) {
        super(props)
        this.state = {
            originalY: 0,
            dragging: false
        }
    }

    startResizing(e) {
        this.setState({
            originalY: e.clientY,
            dragging: true
        })
    }

    stopResizing(e) {
        this.setState({
            originalY: 0,
            dragging: false
        })
    }

    resizing(e) {
        if(!this.state.dragging) return
        if(this.state.originalY == e.clientY) return
        this.props.onResize(this.state.originalY - e.clientY)
        this.state.originalY = e.clientY
        this.state.dragging = true
    }

    render() {

        const className = this.state.dragging ? styles.dragger + ' ' + styles.dragging : styles.dragger

        return (
            <div className={className} onMouseDown={this.startResizing.bind(this)} onMouseMove={this.resizing.bind(this)} onMouseUp={this.stopResizing.bind(this)} onMouseOut={this.stopResizing.bind(this)}>
                Dragger!
            </div>
        )

    }
}
