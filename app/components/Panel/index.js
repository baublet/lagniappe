import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Panel.scss'

class Panel extends Component {

    classNames() {
        let className = styles.panel
        if(this.props.type) {
            if(this.props.type.isArray && this.props.type.isArray()) {
                const classes = this.props.type.split(' ')
                classes.forEach(typeClass => { className += ' ' + styles[typeClass] })
            } else {
                className += ' ' + styles[this.props.type]
            }
        }
        return className
    }

    render() {
        const className = this.classNames()
        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }

}

export default Panel
