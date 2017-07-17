import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Modal}     from 'antd'

import styles               from './Jira.scss'

import Image                from 'lagniappe/components/Image'
import timeSince            from 'lagniappe/utils/timeSince'

export default class Attachments extends Component
{
    constructor(props)
    {
        super(props)
        this.auth = 'Basic ' + btoa(localStorage.getItem('jira-username') + ':' +
                                    localStorage.getItem('jira-password'))
        this.state = {
            modalVisible: false,
            attachment: {},
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.props.attachments.length !== nextProps.attachments.length)
            return true

        if(this.props.attachments[0] && nextProps.attachments[0] &&
                (this.props.attachments[0].id !== nextProps.attachments[0].id))
            return true

        if(this.state.attachment.id && this.state.attachment.id !== nextState.attachment.id)
            return true

        if(!this.state.attachment.id && nextState.attachment.id)
            return true

        if(this.state.modalVisible !== nextState.modalVisible)
            return true

        return false
    }

    openModalFunction(attachment)
    {
        return () => {
            this.setState({
                modalVisible: true,
                attachment: attachment,
            })
        }
    }

    closeModal()
    {
        this.setState(Object.assign({}, this.state, {
            modalVisible: false,
        }))
    }

    renderImageMeta(author, created)
    {
        return (
            <div className={styles.AttachmentAttribution}>
                by {author.displayName}<br />
                {timeSince(created)} ago
            </div>
        )
    }

    renderAttachments()
    {
        const attachments = this.props.attachments
        const auth = this.auth
        if(!attachments || attachments.length < 0) return false
        return attachments.map(attachment => {
            return attachment.mimeType.indexOf('image') > -1 ?
                    <div className={styles.AttachmentBox} key={attachment.id}
                        onClick={this.openModalFunction(attachment)}>
                        <Image src={attachment.thumbnail} headers={{Authorization: auth}} />
                        {this.renderImageMeta(attachment.author, attachment.created)}
                    </div>
                    : false
        })
    }

    renderModal()
    {
        const modalVisible = !!this.state.modalVisible
        return(
            <Modal
                title="Attachment"
                visible={modalVisible}
                onOk={this.closeModal.bind(this)}
                onCancel={this.closeModal.bind(this)}
            >
                {this.renderModalContents()}
            </Modal>
        )
    }

    renderModalContents()
    {
        if(!this.state.attachment.thumbnail) return false
        const attachment = this.state.attachment
        const auth = this.auth
        return(
            <div>
                <div className={styles.AttachmentModalImageWindow}>
                    <Image src={attachment.content} headers={{Authorization: auth}} />
                </div>
                {this.renderImageMeta(attachment.author, attachment.created)}
            </div>
        )
    }

    render()
    {
        return (
            <div>
                <div className={styles.AttachmentsInnerScroller}>
                    {this.renderAttachments()}
                </div>
                {this.renderModal()}
            </div>
        )
    }
}
