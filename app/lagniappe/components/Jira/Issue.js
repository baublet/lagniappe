import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Alert, Row,
         Tooltip, Spin,
         Col, Icon, Table } from 'antd'

import styles               from './Jira.scss'
import config               from 'config'

import IssueInfo            from 'lagniappe/commands/Jira/IssueInfo'
import nl2br                from 'lagniappe/utils/nl2br'
import timeSince            from 'lagniappe/utils/timeSince'
import Attachments          from 'lagniappe/components/Jira/Attachments'
import PullRequests         from 'lagniappe/components/Jira/PullRequests'

export default class Issue extends Component
{

    renderBasics()
    {
        const key = this.props.data.key
        const created = timeSince(this.props.data.fields.created)
        const updated = timeSince(this.props.data.fields.updated)
        const creator = this.props.data.fields.creator
        const assignee = this.props.data.fields.assignee
        const description = nl2br(this.props.data.fields.description)

        return(
            <Row gutter={16}>
                <Col span={16}>
                    <p className={styles.IssueDescription}>{description}</p>
                </Col>
                <Col span={8} className={styles.IssueMeta}>
                    <Row className={styles.IssueMetaIcons}>
                        <Tooltip placement="topRight" title="Jira page">
                            <Icon type="home" onClick={() => open(config.jira.baseUrl + '/browse/' + key)}/>
                        </Tooltip>
                    </Row>
                    <Row>
                        <b className={styles.AgoLabel}>Updated</b>
                        <span className={styles.Ago}>{updated} ago</span>
                    </Row>
                    <Row>
                        <b className={styles.AgoLabel}>Created</b>
                        <span className={styles.Ago}>{created} ago</span>
                    </Row>
                    <hr />
                    <Row className={styles.IssuePeople} gutter={16}>
                        <Col span={12}>
                            <b>Assignee</b>
                            <br/>
                            {assignee.displayName}
                        </Col>
                        <Col span={12}>
                            <b>Creator</b>
                            <br />
                            {creator.displayName}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    render()
    {
        const key = this.props.data.key
        const id = this.props.data.id
        const summary = this.props.data.fields.summary
        const attachments = this.props.data.fields.attachment
        const attachmentCount = this.props.data.fields.attachment.length

        const renderedBasics = this.renderBasics()

        const reloadFunction = this.props.reloadFunction

        return(
            <div>
                <h2 className={styles.IssueNameOnIssuePage}>{summary}</h2>
                <h3>
                    <Button
                        onClick={reloadFunction}
                        size="small" shape="circle"
                        icon="retweet"
                        className={styles.MyIssuesReloadButton} />
                    {key}
                </h3>
                {renderedBasics}
                { attachmentCount > 0 ?
                    <div className={styles.Attachments}>
                        <h4 className={styles.FieldLabel}>Attachments</h4>
                        <Attachments attachments={attachments} />
                    </div>
                : false }
                <PullRequests id={id} />
            </div>
        )
    }

}
