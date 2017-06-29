import React, { Component } from 'react'
import { Link }             from 'react-router'
import { Button, Alert,
         Icon, Table } from 'antd'

import styles               from './Jira.scss'

export default class IssuesList extends Component
{
    dataArray(raw)
    {
        return raw.map(item => {
            return {
                id: item. id,
                key: item.key,
                reporter: item.fields.reporter,
                title: item.fields.summary
            }
        })
    }
    columnsArray()
    {
        return [{
            title: 'Key',
            dataIndex: 'key',
            key: 'key'
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: 'Reporter',
            dataIndex: 'reporter',
            key: 'reporter',
            render(value, row, index)
            {
                return value.displayName
            }
        }]
    }
    render()
    {
        const issues = this.dataArray(this.props.issues)
        const columns = this.columnsArray()
        if(issues.length < 1) return <Alert message="You either do not have any issues or you are not logged in." showIcon type="info" />
        return(
            <div>
                <Table columns={columns} dataSource={issues} />
            </div>
        )
    }
}
