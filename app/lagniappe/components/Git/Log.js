import React, { Component } from 'react'
import { Link } from 'react-router'
import { Timeline, Spin, Tooltip, Button, Menu, Dropdown, Icon } from 'antd'

import GitLog from 'lagniappe/commands/Git/Log'
import Rollback from 'lagniappe/commands/Git/Rollback'
import Revert from 'lagniappe/commands/Git/Revert'

import timeSince from 'lagniappe/utils/timeSince'

import styles from './Git.scss'
import config from 'config'

const MenuItem = Menu.Item
const TimelineItem = Timeline.Item

export default class Log extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            logs: false
        }
    }

    componentWillMount() {
        this.getLog()
    }

    getLog() {
        let log = new GitLog()
        this.setState({
            logs: false
        })
        log.execute(config.cwd).then((logs) => {
            this.setState({
                logs
            })
        })
    }

    revert(commitHash) {
        const revert = new Revert()
        revert.execute(config.cwd, commitHash).then(() => { this.props.refresh() })
    }

    rollback(commitHash) {
        const rollback = new Rollback()
        rollback.execute(config.cwd, commitHash).then(() => { this.props.refresh() })
    }

    menuSelect(commitHash) {
        return ({ item, key, selectedKeys }) => {
            switch(key) {
                case "revert":
                    this.revert(commitHash)
                    break
                case "rollback":
                    this.rollback(commitHash)
                    break
            }
        }
    }

    rowOperations(commitHash) {
        return (
            <Menu onSelect={this.menuSelect(commitHash).bind(this)}>
                <MenuItem key="revert">
                    Create Revert Commit
                </MenuItem>
                <MenuItem key="rollback">
                    Roll Back to Here
                </MenuItem>
            </Menu>
        )
    }

    logRow(log, key) {
        const date = Date.parse(log.date)
        const dateObject = new Date(date)
        return (
            <TimelineItem key={key}>
                <div className={styles.meta}>
                    <Dropdown overlay={this.rowOperations(log.commit)} placement="bottomRight">
                            <Icon type="down-circle" className={styles.operationsButton} />
                    </Dropdown>
                    <div className={styles.author}>{log.author}</div>
                    <div className={styles.date}>
                        <Tooltip placement="top" title={dateObject.toLocaleString()}>
                            {timeSince(date)} ago
                        </Tooltip>
                    </div>
                </div>
                <div className={styles.commit}>{log.commit}</div>
                <div className={styles.message}>{log.message.join("\n")}</div>
            </TimelineItem>
        )
    }

    render() {
        const commits = this.state.logs
        if(!commits) {
            return <Spin />
        }

        let rows = []
        for(let i = 0; i < commits.length; i++) {
            rows.push(this.logRow(commits[i], i))
        }

        return (
            <div>
                <h3>
                    This Branch
                </h3>
                <Timeline>
                    {rows}
                </Timeline>
            </div>
        )
    }

}
