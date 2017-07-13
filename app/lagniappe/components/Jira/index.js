import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Row, Col,
         Input, Alert,
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
        console.log('Reconstructing Jira')
        console.log(this.state)
        this.resetState(false)
    }

    componentDidMount()
    {
        this.checkAuthentication()
    }

    resetState(mounted = true)
    {
        const state = {
            issuesLoading: false,
            username: false,
            password: false,
            authorized: false,
            issues: [],
            renderKey: 0,
            lastIssuesCommand: null,
        }
        this.CheckAuthentication = false
        this.MyIssues = false
        if(mounted) {
            this.setState(state)
        } else {
            state.username = localStorage.getItem('jira-username')
            state.password = localStorage.getItem('jira-password')
            this.state = state
        }
    }

    loadIssuesCommandToState(issuesCommand)
    {
        this.setState(Object.assign({}, this.state, { issuesLoading: true }))
        issuesCommand.execute().then(issues => {
            this.setState(Object.assign({}, this.state, {
                issues,
                issuesLoading: false,
                renderKey: this.state.renderKey++,
                lastIssuesCommand: issuesCommand,
            }))
        })
    }

    reloadIssues()
    {
        if(this.state.lastIssuesCommand)
        {
            this.loadIssuesCommandToState(this.state.lastIssuesCommand)
        }
    }

    loadMyIssues()
    {
        const Issues = new MyIssues()
        this.loadIssuesCommandToState(Issues)
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
        const CheckAuth = new CheckAuthentication(config.jira.baseUrl,
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

    childrenWithProps(props)
    {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, props)
        })
    }

    render()
    {
        const issues = this.state.issues
        const username = this.state.username
        const password = this.state.password
        const loading = this.state.issuesLoading
        const authorized = this.state.authorized
        const credentialsForm = this.credentialsForm()
        const renderKey = this.state.renderKey
        const reloadFunction = this.reloadIssues.bind(this)
        const children = this.childrenWithProps({issues, loading, reloadFunction, renderKey})
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
                <div className={styles.MainJiraWindow}>
                    { authorized ?
                        children
                    :
                        <Alert message="You are not logged in." showIcon type="info" />
                    }
                </div>
            </div>
        )
    }

}
