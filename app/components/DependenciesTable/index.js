import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd'

import Dependencies from 'dependencies'

import styles from './DependenciesTable.scss'

class DependenciesTable extends Component {

    constructor(props) {
        super(props)

        const dependencies = Dependencies.getDependencies()
        let data = []
        let i = 0
        dependencies.forEach(dependency => {
            data.push({
                key: i,
                name: dependency.dependencyName,
                required: dependency.required ? 'Required' : 'Optional',
                status: !dependency._installed ? 'Not Installed' : 'Installed',
                dependency,
                loading: false,
            })
            i++
        })
        this.state = {
            tableData: data
        }
    }

    install(dependencyColumn) {
        const dependency = dependencyColumn.dependency
        return () => {
            const newState = Object.assign({}, this.state)
            newState.tableData[dependencyColumn.key].loading = true
            this.setState(newState)
            dependency.install().then(() => {
                const newState = Object.assign({}, this.state)
                newState.tableData[dependencyColumn.key].loading = false
                this.setState(newState)
            })
        }
    }

    uninstall(dependencyColumn) {
        const dependency = dependencyColumn.dependency
        return () => {
            const newState = Object.assign({}, this.state)
            newState.tableData[dependencyColumn.key].loading = true
            this.setState(newState)
            dependency.uninstall().then(() => {
                const newState = Object.assign({}, this.state)
                newState.tableData[dependencyColumn.key].loading = false
                this.setState(newState)
            })
        }
    }

    actionColumn(text, row) {
        const installed = row.dependency._installed
        const name = row.dependency.dependencyName
        let confirmTitle = installed ? 'Are you sure want to uninstall ' : 'Are you sure you want to uninstall '
        confirmTitle += name + '?'
        return (
            <div>

                <span className={styles.status}>
                    {installed ? 'Installed' : 'Not Installed'}
                </span>

                { installed ?
                    <Popconfirm placement="topRight" title={confirmTitle} onConfirm={(this.uninstall(row).bind(this))} okText="Uninstall" cancelText="Cancel">
                        <Button loading={row.loading}>Uninstall</Button>
                    </Popconfirm>
                    :
                    <Popconfirm placement="topRight" title={confirmTitle} onConfirm={this.install(row).bind(this)} okText="Install" cancelText="Cancel">
                        <Button type="primary" loading={row.loading}>Install</Button>
                    </Popconfirm>
                }

            </div>
        )
    }

    render() {

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Required',
            dataIndex: 'required',
            key: 'required'
        }, {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            className: styles.toolbar,
            render: this.actionColumn.bind(this)
        }]


        const className = ''
        const data = this.state.tableData

        return (
            <div className={className}>
                <Table dataSource={data} columns={columns} showHeader={false} pagination={false} size="middle" />
            </div>
        )
    }

}

export default DependenciesTable
