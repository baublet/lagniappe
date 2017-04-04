import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button } from 'antd'

import { Row, Col, Steps, Spin, Progress } from 'antd'

import Dependencies from 'dependencies'

import styles from './Startup.scss'

export default class Startup extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            currentMessage: 'Loading user interface',
            stepNumber: 0,
            progressPercent: 0
        }
    }

    componentDidMount() {

        const progressTicks = Dependencies.getDependenciesCount() * 2
        let   progressTick  = 0

        setTimeout(() => {
            Dependencies.checkInstalled(dependencyName => {
                this.setState({
                    currentMessage: 'Checking ' + dependencyName + '...',
                    stepNumber: 1,
                    progressPercent: 15 + ((progressTick / progressTicks) * 100)
                })
                progressTick++
            }).then(() => {
                Dependencies.install(dependencyName => {
                    this.setState({
                        currentMessage: 'Installing ' + dependencyName + '... This may take a few minutes',
                        stepNumber: 2,
                        progressPercent: 15 + ((progressTick / progressTicks) * 100)
                    })
                    progressTick++
                }).then(() => {
                    console.log('All done')
                    this.setState({
                        currentMessage: 'All done!',
                        stepNumber: 2,
                        progressPercent: 100
                    })
                })
            })
        }, 500)
    }

    dependencies() {
        const currentStep = this.state.stepNumber
        return (
            <Steps direction="vertical" size="small" current={currentStep}>
              <Steps.Step title="User Interface" description="Loading the user interface" />
              <Steps.Step title="Dependencies" description="Checking dependencies" />
              <Steps.Step title="Installing Dependencies" description="Installing necessary dependencies" />
            </Steps>
        )
    }

    render() {
        const progress = this.state.progressPercent
        const message = this.state.currentMessage

        if(progress > 99) return null

        return (
            <div className={styles.startupWrapper}>
                <div className={styles.startupFade}>&nbsp;</div>
                <div className={styles.startupModal}>
                    <Row>
                        <Col span={24}>{this.dependencies()}</Col>
                    </Row>
                    <Row gutter={32} type="flex" style={{alignItems: 'center'}}>
                        <Col span={4}><Spin size="large" /></Col>
                        <Col span={20} className={styles.messageBox}>{message}</Col>
                    </Row>
                    <Row className={styles.startupProgress}>
                        <Col span={24}><Progress percent={progress} showInfo={false} /></Col>
                    </Row>
                </div>
            </div>
        )
    }

}
