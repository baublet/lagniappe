import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Alert, Row,
         Col,Icon, Table }  from 'antd'
import open                 from 'open'

import styles               from './Jira.scss'
import config               from 'config'

import IssueInfo            from 'lagniappe/commands/Jira/IssueInfo'
import nl2br                from 'lagniappe/utils/nl2br'

export default class Issue extends Component
{

    render()
    {
        const key = this.props.data.key
        const id = this.props.data.id
        const description = nl2br(this.props.data.fields.description)
        const summary = this.props.data.fields.summary
        const created = this.props.data.fields.created
        const updated = this.props.data.fields.updated
        const creator = this.props.data.fields.creator
        const attachments = this.props.data.fields.attachment
        const assignee = this.props.data.fields.assignee

        const reloadFunction = this.props.reloadFunction

        return(
            <div>
                <h3>
                    <Button
                        onClick={reloadFunction}
                        size="small" shape="circle"
                        icon="retweet"
                        className={styles.MyIssuesReloadButton} />
                    {key}
                </h3>
                <h2 className={styles.IssueNameOnIssuePage}>{summary}</h2>
                <p>{description}</p>
            </div>
        )
    }

}
