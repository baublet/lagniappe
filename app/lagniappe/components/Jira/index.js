import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Row, Col,
         Input,
         Spin, Icon, Menu } from 'antd'
import config               from 'config'
import styles               from './Jira.scss'

export default class Jira extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: false,
            username: false,
            password: false,
            authorized: false,
            issues: []
        }
        this.loadMyIssues()
    }

    loadMyIssues()
    {
        if(!this.state.username) return false
    }

    credentialsForm()
    {
        const inputDisabled = this.state.authorized
        return (
            <div className={styles.LoginForm}>
                <h3>Jira Credentials</h3>
                <div className={styles.LoginFormGroup}>
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                           placeholder="Email Address" disabled={inputDisabled} />
                </div>
                <div className={styles.LoginFormGroup}>
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                           type="password" placeholder="Password" disabled={inputDisabled} />
                </div>
                {inputDisabled ?
                    <Button type="default">Log Out</Button>
                :
                    <Button type="primary">Log in</Button>
                }
            </div>
        )
    }

    render()
    {
        const issues = this.state.issues
        const username = this.state.username
        const password = this.state.password
        const credentialsForm = this.credentialsForm()
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h1>
                            <Icon type="appstore" /> Jira
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={18}>

                    </Col>
                    <Col span={6}>
                        {credentialsForm}
                    </Col>
                </Row>
            </div>
        )
    }

}
