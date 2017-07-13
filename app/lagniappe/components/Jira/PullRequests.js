import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Row, Col,
         Input,
         Spin, Icon, Menu } from 'antd'

import IssuePullRequests    from 'lagniappe/commands/Jira/IssuePullRequests'
import timeSince            from 'lagniappe/utils/timeSince'

import config               from 'config'
import styles               from './Jira.scss'

export default class PullRequests extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            pullRequests: []
        }
    }

    componentDidMount()
    {
        this.loadPullRequests()
    }

    loadPullRequests()
    {
        this.setState({
            loading: true,
            pullRequests: []
        })
        const command = new IssuePullRequests()
        const id = this.props.id
        command.execute(id, 'github').then((pullRequests) => {
            this.setState({
                loading: false,
                pullRequests: Object.values(pullRequests)
            })
        })
    }

    render()
    {
        const pullRequests = this.state.pullRequests
        const loading = this.state.loading

        if(loading) return <Spin />
        if(!pullRequests || pullRequests.length == 0) return false

        return (
            <div className={styles.DevStatus}>
                <h4>Pull Requests</h4>
                { pullRequests.map(pr => {
                    return(
                        <div key={pr.id} className={styles.PullRequest}>
                            <div className={styles.PRLeft}>
                                <img src={pr.author.avatar + '&size=50'} />
                            </div>
                            <div className={styles.PRInfo}>
                                <b className={styles.PRTitle}>{pr.name}</b>
                                <div className={styles.PRBranches}>
                                    {pr.source.branch}
                                    &nbsp;
                                    &rarr;
                                    &nbsp;
                                    {pr.destination.branch}
                                </div>
                                <div className={styles.PRMeta}>
                                    <b className={styles.PRAuthor}>{pr.author.name}</b>, <em className={styles.PRDate}>{timeSince(pr.lastUpdate)} ago</em>
                                </div>
                            </div>
                            <div className={styles.PRBranchActions}>
                                <Button>Hi</Button>
                            </div>
                        </div>
                    )
                }) }
            </div>
        )
    }
}
