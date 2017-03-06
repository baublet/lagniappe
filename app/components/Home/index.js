// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import Button from '../Button'
import Command from '../../commands/Command'
import styles from './Home.scss'


export default class Home extends Component
{

    testCommand() {
        let command = new Command()
        command.execute()
    }

    render() {
        return (
            <div className={styles.container} data-tid="container">
              <h2>Home</h2>
              <Button onClick={this.testCommand}>Test Command</Button>
            </div>
        )
    }

}
