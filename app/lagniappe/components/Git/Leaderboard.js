import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button, Spin, Icon, Tabs , Table, Alert } from 'antd'

import CurrentBranch from 'lagniappe/commands/Git/CurrentBranch'
import ShortLog from 'lagniappe/commands/Git/ShortLog'

import config from 'config'
import styles from './Git.scss'

const TabPane = Tabs.TabPane

export default class Leaderboard extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            currentBranch: '',
            boards: [{
                // All time
                since: false,
                data: [],
            },{
                since: '1 year',
                data: [],
            },{
                since: '6 months',
                data: [],
            }, {
                since: '1 week',
                data: [],
            }],
            loading: true
        }
    }

    componentWillMount()
    {
        this.getCurrentBranch()
        this.loadLeaderboards()
    }

    getCurrentBranch()
    {
        this.setState(Object.assign({}, this.state, { loading: true }))
        let currentBranch = new CurrentBranch()
        currentBranch.execute(config.cwd).then(branch => {
            this.setState(Object.assign({}, this.state, {
                loading: false,
                currentBranch: branch
            } ))
        })
    }

    loadLeaderboards()
    {
        this.setState(Object.assign({}, this.state, { loading: true }))
        const boards = this.state.boards
        boards.forEach(board => {
            const shortLogger = new ShortLog()
            shortLogger.execute(board.since, config.cwd).then(data => {
                const newBoards = this.state.boards
                newBoards.forEach( (newBoard, index) => {
                    if(board.since == newBoard.since) {
                        newBoards[index] = Object.assign({}, newBoard, { data })
                        this.setState(Object.assign({}, this.state, { loading: false }))
                    }
                })
            })
        })
    }

    renderBoard(board)
    {
        if(!board.data.length) {
            return <Alert message="No commits for this time period, yet!" showIcon type="info" />
        }
        const columns = [{
            title: 'Commits',
            dataIndex: 'commits',
            key: 'commits'
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }]
        return <Table columns={columns} dataSource={board.data} />
    }

    renderTabPanes()
    {
        const boards = this.state.boards
        return (
            <Tabs defaultActiveKey="1">
                {boards.map(board => (
                    <TabPane tab={board.since ? board.since : 'All Time' } key={board.since ? board.since : "1"}>
                        {this.renderBoard(board)}
                    </TabPane>
                ))}
            </Tabs>
        )
    }

    render()
    {
        const loading = this.state.loading
        return (
            <div className={styles.leaderboard}>
                <h1>
                    <Icon type="solution" /> Git Leaderboards
                    <Button icon="retweet" onClick={this.loadLeaderboards.bind(this)} type="primary" shape="circle" size="small" style={{float: 'right'}} />
                </h1>
                {loading ? <Spin /> : this.renderTabPanes()}
            </div>
        )
    }

}
