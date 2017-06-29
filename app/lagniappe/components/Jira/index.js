import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Row, Col,
         Input,
         Spin, Icon, Menu } from 'antd'

import config               from 'config'
import styles               from './Jira.scss'

import CheckAuthentication  from 'lagniappe/commands/Jira/CheckAuthentication'

export default class Jira extends Component
{
    constructor(props)
    {
        super(props)
        this.resetState(false)
        this.loadMyIssues()
    }

    resetState(mounted = true)
    {
        const state = {
            loading: false,
            username: false,
            password: false,
            authorized: false,
            issues: []
        }
        if(mounted) {
            this.setState(state)
        } else {
            this.state = state
            this.state.username = localStorage.getItem('jira-username')
            this.state.password = localStorage.getItem('jira-password')
        }
    }

    loadMyIssues()
    {
        if(!this.state.username || !this.state.password) return false

    }

    saveCredentials()
    {
        localStorage.setItem('jira-username', this.state.username)
        localStorage.setItem('jira-password', this.state.password)
    }

    checkAuthentication()
    {
        const username = this.usernameInput.refs.input.value
        const password = this.passwordInput.refs.input.value
        if(!username || !password) return false
        this.setState(Object.assign({}, this.state, {
            username,
            password,
            authorized: false,
            loading: true
        }))
        const checker = new CheckAuthentication()
        checker
        .execute(config.jira.baseUrl, username, password)
        .then((success) => {
            if(!success) {
                return this.resetState()
            }
            this.saveCredentials()
            this.setState(Object.assign({}, this.state, {
                authorized: true,
                loading: false
            }))
        })
    }

    credentialsForm()
    {
        const inputDisabled = this.state.authorized
        const loading = this.state.loading
        const username = this.state.username ? this.state.username : ''
        const password = this.state.password ? this.state.password : ''
        return (
            <div className={styles.LoginForm}>
                <h3>Jira Credentials</h3>
                <div className={styles.LoginFormGroup}>
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                           placeholder="Email Address" disabled={inputDisabled}
                           ref={node => this.usernameInput = node}
                           defaultValue={username} />
                </div>
                <div className={styles.LoginFormGroup}>
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                           type="password" placeholder="Password"
                           disabled={inputDisabled}
                           ref={node => this.passwordInput = node}
                           defaultValue={password} />
                </div>
                {inputDisabled ?
                    <Button type="default" onClick={this.resetState.bind(this)}>Log Out</Button>
                :
                    <Button type="primary"
                            onClick={this.checkAuthentication.bind(this)}
                            disabled={loading}
                            loading={loading}>Log in</Button>
                }
            </div>
        )
    }

    render()
    {
        const issues = this.state.issues
        const username = this.state.username
        const password = this.state.password
        const loading = this.state.loading
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
