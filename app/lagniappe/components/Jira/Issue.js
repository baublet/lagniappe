import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Alert, Row,
         Col,Icon, Table }  from 'antd'
import open                 from 'open'

import styles               from './Jira.scss'
import config               from 'config'

import IssueInfo            from 'lagniappe/commands/Jira/IssueInfo'
import nl2br                from 'lagniappe/utils/nl2br'

import Image                from 'lagniappe/components/Image'

export default class Issue extends Component
{

    renderAttachments(attachments)
    {
        const auth = 'Basic ' +
                        btoa(
                            localStorage.getItem('jira-username') + ':' +
                            localStorage.getItem('jira-password')
                        )
        return attachments.map(attachment => {
            return attachment.mimeType.indexOf('image') > -1 ?
                    <div className={styles.AttachmentBox} key={attachment.id}
                        onClick={() => { open(attachment.content) }}>
                        <Image src={attachment.thumbnail} headers={{Authorization: auth}} />
                        <div className={styles.AttachmentAttribution}>
                            by {attachment.author.displayName}<br />
                            on {new Date(Date.parse(attachment.created)).toLocaleDateString()}
                        </div>
                    </div>
                    : false
        })
    }

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

        const renderedAttachments = this.renderAttachments(attachments)

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
                <p className={styles.IssueDescription}>{description}</p>
                { attachments.length > 0 ?
                    <div className={styles.Attachments}>
                        <div className={styles.AttachmentsInnerScroller}>
                            {renderedAttachments}
                        </div>
                    </div>
                : false }
            </div>
        )
    }

}
