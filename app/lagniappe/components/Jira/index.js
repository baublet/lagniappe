import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Row, Col,
         Input,
         Spin, Icon, Menu } from 'antd'

import config               from 'config'
import styles               from './Jira.scss'

import CheckAuthentication  from 'lagniappe/commands/Jira/CheckAuthentication'
import MyIssues             from 'lagniappe/commands/Jira/MyIssues'

import IssuesList           from './IssuesList'

export default class Jira extends Component
{
    constructor(props)
    {
        super(props)
        this.resetState(false)
    }

    componentDidMount()
    {
        if(!this.state.issues.length) {
            this.loadMyIssues()
        }
    }

    resetState(mounted = true)
    {
        const state = {
            loading: false,
            username: false,
            password: false,
            authorized: false,
            issues: [],
            renderKey: 0,
        }
        this.CheckAuthentication = false
        this.MyIssues = false
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
        if(!this.state.authorized) return false
        const Issues = this.MyIssues ?
                        this.MyIssues :
                        new MyIssues(   config.jira.baseUrl,
                                        this.state.username,
                                        this.state.password )
        this.setState(Object.assign({}, this.state, { issuesLoading: true }))
        Issues.execute().then(issues => {
            this.setState(Object.assign({}, this.state, {
                issues,
                issuesLoading: false,
                renderKey: this.state.renderKey++,
            }))
        })
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
            authLoading: true
        }))
        const CheckAuth = this.CheckAuthentication ?
                            this.CheckAuthentication :
                            new CheckAuthentication(config.jira.baseUrl,
                                                    username, password )
        CheckAuth
        .execute()
        .then((success) => {
            if(!success) {
                return this.resetState()
            }
            this.saveCredentials()
            this.setState(Object.assign({}, this.state, {
                authorized: true,
                authLoading: false
            }))
            this.loadMyIssues()
        })
    }

    credentialsForm()
    {
        const inputDisabled = this.state.authorized
        const loading = this.state.authLoading
        const username = this.state.username ? this.state.username : ''
        const password = this.state.password ? this.state.password : ''
        return (
            <div className={styles.LoginForm}>
                <h5>Jira Credentials</h5>
                <Row gutter={8}>
                    <Col span={9}>
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                               placeholder="Email Address" disabled={inputDisabled}
                               ref={node => this.usernameInput = node}
                               defaultValue={username} />
                    </Col>
                    <Col span={9}>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                               type="password" placeholder="Password"
                               disabled={inputDisabled}
                               ref={node => this.passwordInput = node}
                               defaultValue={password} />
                    </Col>
                    <Col span={6}>
                        {inputDisabled ?
                            <Button type="default" onClick={this.resetState.bind(this)}>Log Out</Button>
                        :
                            <Button type="primary"
                                    onClick={this.checkAuthentication.bind(this)}
                                    disabled={loading}
                                    loading={loading}>Log in</Button>
                        }
                    </Col>
                </Row>
            </div>
        )
    }

    render()
    {
        const issues = this.state.issues
        const username = this.state.username
        const password = this.state.password
        const loading = this.state.issuesLoading
        const credentialsForm = this.credentialsForm()
        const renderKey = this.state.renderKey
        return (
            <div>
                <Row gutter={16}>
                    <Col span={8}>
                        <h1>
                            <Icon type="appstore" /> Jira
                        </h1>
                    </Col>
                    <Col span={16}>
                        {credentialsForm}
                    </Col>
                </Row>
                <div>
                    <h2>Your Issues</h2>
                    { loading ?
                        <Spin />
                    :
                        <IssuesList renderKey={renderKey} issues={issues} reloadFunction={this.loadMyIssues.bind(this)} />
                    }
                </div>
            </div>
        )
    }

}
