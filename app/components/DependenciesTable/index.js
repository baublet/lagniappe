import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd'

import { exec } from 'child_process'

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
                status: dependency._installed == false ? 'Not Installed' : 'Installed',
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
            exec(dependency.installationCommand, { name: 'lagniappe' }, (error, stdout, stderr) => {
                const success = error ? false : true
                if(!success) {
                    alert('ERROR: ' + stderr)
                    return
                }
                const newState = Object.assign({}, this.state)
                newState.tableData[dependencyColumn.key].loading = false
                newState.tableData[dependencyColumn.key]._installed = true
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
            exec(dependency.uninstallCommand, { name: 'lagniappe' }, (error, stdout, stderr) => {
                const success = error ? false : true
                if(!success) {
                    alert('ERROR: ' + stderr)
                    return
                }
                const newState = Object.assign({}, this.state)
                newState.tableData[dependencyColumn.key].loading = false
                newState.tableData[dependencyColumn.key]._installed = false
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            className: styles.toolbar,
            render: (text, dependency) => {
                let confirmTitle = dependency._installed ? 'Are you sure want to uninstall ' : 'Are you sure you want to uninstall '
                confirmTitle += dependency.dependencyName + '?'
                return (
                    <div>

                        <span className={styles.status}>
                            {dependency._installed == false ? 'Not Installed' : 'Installed'}
                        </span>

                        { dependency._installed == false ?
                            <Popconfirm placement="topRight" title={confirmTitle} onConfirm={this.install(dependency).bind(this)} okText="Install" cancelText="Cancel">
                                <Button type="primary" loading={dependency.loading}>Install</Button>
                            </Popconfirm>
                          :
                            <Popconfirm placement="topRight" title={confirmTitle} onConfirm={(this.uninstall(dependency).bind(this))} okText="Uninstall" cancelText="Cancel">
                                <Button loading={dependency.loading}>Uninstall</Button>
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
