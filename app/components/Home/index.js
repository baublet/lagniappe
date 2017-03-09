// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import Button from '../Button'

import Command from '../../commands/Command'
import MultipleCommands from '../../commands/MultipleCommands'
import Tail from '../../commands/Tail'

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
            <div className={styles.container} data-tid="container">
              <Button onClick={this.testCommand}>Test Command</Button>
              <Button onClick={this.testMultipleCommands}>Multiple Commands</Button>
              <Button onClick={this.testLongRunningCommand}>Tail</Button>
            </div>
        )
    }

}
