// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import Command from 'commands/Command'
import SequenceTest from 'commands/SequenceTest'
import Tail from 'commands/Tail'

import Panel from '../Panel'
import PanelHeading from '../Panel/Heading'

import Grid from 'components/Grid'
import Row from 'components/Row'
import Col from 'components/Col'

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

    testTale() {
        let command = new Tail('package.json')
        command.execute()
    }

    render() {
        return (
            <div>
                <Panel type="fullWidth">
                    <PanelHeading>Development Environment</PanelHeading>
                    <div className="buttonGroup">
                        <RaisedButton label="Default" primary={true} onClick={this.testCommand} />
                        <RaisedButton label="Sequence" primary={true} onClick={this.testMultipleCommands} />
                        <RaisedButton label="Tail" primary={true} onClick={this.testTail} />
                    </div>
                </Panel>

                <Grid>
                    <Row>
                        <Col span="3">Three</Col>
                        <Col span="3">Three</Col>
                        <Col span="3">Three</Col>
                    </Row>
                    <Row>
                        <Col span="3">Three</Col>
                        <Col span="6">Six</Col>
                    </Row>
                    <Row>
                        <Col span="9">Full</Col>
                    </Row>
                </Grid>
            </div>
        )
    }

}
