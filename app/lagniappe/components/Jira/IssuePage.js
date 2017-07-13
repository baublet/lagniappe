import React, { Component } from 'react'
import { Link, hashHistory }from 'react-router'
import { Button, Alert, Row,
         Col, Icon, Table,
         Spin }             from 'antd'
import open                 from 'open'

import styles               from './Jira.scss'

import IssueInfo            from 'lagniappe/commands/Jira/IssueInfo'
import Issue                from './Issue'

export default class IssuePage extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading:   true,
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
        const command = new IssueInfo()
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
                <Button type="primary"
                    onClick={() => hashHistory.goBack()}
                    className={styles.BackLink}
                >
                    <Icon type="left" />Go back
                </Button>
                {loading ?
                    <Spin />
                :
                    <Issue data={data} reloadFunction={reloadFunction} />
                }
            </div>
        )
    }
}
