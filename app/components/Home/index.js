import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button } from 'antd'

import Command from 'commands/Command'
import SequenceTest from 'commands/SequenceTest'
import Tail from 'commands/Tail'

import Panel from '../Panel'
import PanelHeading from '../Panel/Heading'

import { Row, Col } from 'antd'

import styles from './Home.scss'


export default class Home extends Component
{

    testCommand() {
        let command = new Command()
        command.execute()
    }

    testMultipleCommands() {
        let command = new SequenceTest()
        command.execute()
    }

    testTail() {
        let command = new Tail('package.json')
        command.execute()
    }

    render() {
        return (
            <Panel type="fullWidth">
                <PanelHeading>Development Environment</PanelHeading>
                <Button.Group className="t-spacing">
                    <Button type="primary" onClick={this.testCommand}>Default</Button>
                    <Button type="primary" onClick={this.testMultipleCommands}>Multiple Commands</Button>
                    <Button type="primary" onClick={this.testTail}>Tail</Button>
                </Button.Group>
            </Panel>
        )
    }

}
