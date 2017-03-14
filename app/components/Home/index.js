// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import Button from '../Button'

import Command from '../../commands/Command'
import MultipleCommands from '../../commands/MultipleCommands'
import Tail from '../../commands/Tail'

import Panel from '../Panel'
import PanelHeading from '../Panel/Heading'

import styles from './Home.scss'


export default class Home extends Component
{

    testCommand() {
        let command = new Command()
        command.execute()
    }

    testMultipleCommands() {
        let command = new MultipleCommands()
        command.execute()
    }

    testLongRunningCommand() {
        let command = new Tail('package.json')
        command.execute()
    }

    render() {
        return (
            <Panel type="fullWidth">
                <PanelHeading>Development Environment</PanelHeading>
                <div className="buttonGroup">
                  <Button onClick={this.testCommand}>Test Command</Button>
                  <Button onClick={this.testMultipleCommands}>Multiple Commands</Button>
                  <Button onClick={this.testLongRunningCommand}>Tail</Button>
                </div>
            </Panel>
        )
    }

}
