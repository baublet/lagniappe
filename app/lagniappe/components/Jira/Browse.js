import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Row, Col,
         Input,
         Spin, Icon, Menu } from 'antd'

import config               from 'config'
import styles               from './Jira.scss'

import IssuesList           from './IssuesList'

export default class Browse extends Component
{
    render()
    {
        const loading = this.props.loading ? this.props.loading : false
        const issues = this.props.issues && this.props.issues.length ? this.props.issues : []
        const renderKey = this.props.renderKey
        const reloadFunction = this.props.reloadFunction
        return (
            <div>
                <h2>Your Issues</h2>
                { loading ?
                    <Spin />
                :
                    <IssuesList renderKey={renderKey} issues={issues} reloadFunction={reloadFunction} />
                }
            </div>
        )
    }
}
