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
            render: (text, dependency) => {
                const installed = dependency.dependency._installed
                const name = dependency.dependency.dependencyName
                let confirmTitle = installed ? 'Are you sure want to uninstall ' : 'Are you sure you want to uninstall '
                confirmTitle += name + '?'
                return (
                    <div>

                        <span className={styles.status}>
                            {installed ? 'Installed' : 'Not Installed'}
                        </span>

                        { installed ?
                            <Popconfirm placement="topRight" title={confirmTitle} onConfirm={(this.uninstall(dependency).bind(this))} okText="Uninstall" cancelText="Cancel">
                                <Button loading={dependency.loading}>Uninstall</Button>
                            </Popconfirm>
                            :
                            <Popconfirm placement="topRight" title={confirmTitle} onConfirm={this.install(dependency).bind(this)} okText="Install" cancelText="Cancel">
                                <Button type="primary" loading={dependency.loading}>Install</Button>
                            </Popconfirm>
                        }

                    </div>
                )
            }
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
