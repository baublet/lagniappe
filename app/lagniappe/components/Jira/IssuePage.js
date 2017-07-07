import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Alert, Row,
         Col, Icon, Table,
         Spin }             from 'antd'
import open                 from 'open'

import styles               from './Jira.scss'
import config               from 'config'

import IssueInfo            from 'lagniappe/commands/Jira/IssueInfo'
import Issue                from './Issue'

export default class IssuePage extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading:   true,
            username:  false,
            password:  false,
            issueInfo: {},
        }
    }

    componentDidMount()
    {
        this.loadIssue()
    }

    loadIssue()
    {
        const identifier = this.props.params.splat
        const newState = {}
        this.setState(Object.assign({}, this.state, { loading: true }))
        newState.username = localStorage.getItem('jira-username')
        newState.password = localStorage.getItem('jira-password')
        const command = this.issueFinder ?
                            this.issueFinder :
                            new IssueInfo(config.jira.baseUrl, newState.username, newState.password)
        command.execute(identifier).then(info => {
            newState.issueInfo = info
            newState.loading = false
            this.setState(newState)
        })
    }

    render()
    {
        const reloadFunction = this.loadIssue.bind(this)
        const loading = this.state.loading
        const data = this.state.issueInfo
        return(
            <div>
                <h1>
                    <Icon type="appstore" /> Jira
                </h1>
                <div>
                    {loading ?
                        <Spin />
                    :
                        <Issue data={data} reloadFunction={reloadFunction} />
                    }
                </div>
            </div>
        )
    }
}
