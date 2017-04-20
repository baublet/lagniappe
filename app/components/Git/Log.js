import React, { Component } from 'react'
import { Link } from 'react-router'
import { Timeline, Spin, Tooltip, Button, Menu, Dropdown, Icon } from 'antd'

import GitLog from 'commands/Git/Log'
import Rollback from 'commands/Git/Rollback'
import Revert from 'commands/Git/Revert'

import timeSince from 'utils/timesince'

import styles from './Git.scss'
import config from 'config'

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
                <Menu.Item key="revert">
                    Create Revert Commit
                </Menu.Item>
                <Menu.Item key="rollback">
                    Roll Back to Here
                </Menu.Item>
            </Menu>
        )
    }

    logRow(log, key) {
        const date = Date.parse(log.date)
        const dateObject = new Date(date)
        return (
            <Timeline.Item key={key}>
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
            </Timeline.Item>
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
