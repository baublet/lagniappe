import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Alert, Row,
         Col, Input, Checkbox,
         Icon, Table }      from 'antd'
import open                 from 'open'
import stringComparison     from 'lagniappe/utils/stringComparison'

import styles               from './Jira.scss'
import config               from 'config'

const Search = Input.Search

export default class IssuesList extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            filter: '',
            showClosed: false,
        }
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.state.filter !== nextState.filter) return true
        if(this.state.showClosed !== nextState.showClosed) return true
        if(!this.props.issues) return true
        if(this.props.issues.length !== nextProps.issues.length) return true
        if(this.props.renderKey !== nextProps.renderKey) return true
        return false
    }
    dataArray(raw)
    {
        return raw.map(item => {
            return {
                id: item. id,
                key: item.key,
                reporter: item.fields.reporter,
                title: item.fields.summary,
                priority: item.fields.priority,
                status: item.fields.status.name,
            }
        }).filter(item => {
            if(this.state.showClosed) return true
            if(item.status.toUpperCase() == "CLOSED") return false
            return true
        }).filter(item => {
            if(!this.state.filter) return true
            if(item.key.toUpperCase().indexOf(this.state.filter.toUpperCase()) > -1) return true
            if(item.title.toUpperCase().indexOf(this.state.filter.toUpperCase()) > -1) return true
            return false
        })
    }
    columnsArray()
    {
        return [{
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            className: styles.KeyRow,
            sorter: (a, b) => stringComparison(a.key, b.key),
            render(value, row, index)
            {
                const closed = row.status.toUpperCase() == 'CLOSED' ? true : false
                return (
                    <div className={closed ? styles.Closed : ''}>
                        {value}
                    </div>
                )
            }
        }, {
            title: '',
            dataIndex: 'priority',
            key: 'priority',
            sorter: (a, b) => stringComparison(a.priority.name, b.priority.name),
            render(value, row, index)
            {
                return <img src={value.iconUrl} className={styles.List__Priority} />
            }
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => stringComparison(a.title, b.title),
            render(value, row, index)
            {
                const externalUrl = config.jira.baseUrl + '/browse/' + row.key
                const className = row.status.toUpperCase() == 'CLOSED' ? styles.List__Title + ' ' + styles.Closed : styles.List__Title
                return (
                    <div className={styles.TitleRow}>
                        <a className={className} onClick={() => { open(externalUrl) }}>{value}</a>
                        <div className={styles.TitleRowInfo}>
                            reported by {row.reporter.displayName}
                            &nbsp; &bull; &nbsp;
                            {row.status}
                        </div>
                    </div>
                )
            }
        }]
    }

    render()
    {
        const issues = this.dataArray(this.props.issues)
        const columns = this.columnsArray()

        if(this.props.issues.length < 1) {
            return <Alert message="You either do not have any issues or you are not logged in." showIcon type="info" />
        }

        return(
            <div className={styles.IssuesList}>
                <Row gutter={16} className={styles.IssuesListFilters}>
                    <Col span={12}>
                        <Search
                            placeholder="Filter"
                            onSearch={value => this.setState(Object.assign({}, this.state, { filter: value }))}
                        />
                    </Col>
                    <Col span={12}>
                        <Checkbox onChange={e => this.setState(Object.assign({}, this.state, { showClosed: !!e.target.checked }))}>
                            Closed
                        </Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table size="middle" columns={columns} dataSource={issues}
                               pagination={{
                                   simple: false,
                                   showSizeChanger: true,
                               }} />
                    </Col>
                </Row>
            </div>
        )
    }
}
