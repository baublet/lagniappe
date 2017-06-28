import React, { Component } from 'react'
import { Table, Button, Popconfirm, Icon, Tooltip } from 'antd'
import open from 'open'

import Dependencies from 'dependencies/index'

import styles from './DependenciesTable.scss'

class DependenciesTable extends Component {

    constructor(props)
    {
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

    install(dependencyColumn)
    {
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

    uninstall(dependencyColumn)
    {
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

    actionColumn(text, row)
    {
        const installed = row.dependency._installed
        const name = row.dependency.dependencyName
        const allowAutomatedInstall = !!row.dependency.allowAutomatedInstall
        const installLink = row.dependency.installLink
        const allowAutomatedUninstall = !!row.dependency.allowAutomatedUninstall
        const uninstallLink = row.dependency.uninstallLink

        let confirmTitle = installed ? 'Are you sure want to uninstall ' : 'Are you sure you want to install '
        confirmTitle += name + '?'

        let actionButton = installed ?
            allowAutomatedUninstall ?
                <Popconfirm placement="topRight" title={confirmTitle} onConfirm={(this.uninstall(row).bind(this))} okText="Uninstall" cancelText="Cancel">
                    <Button loading={row.loading}>Uninstall</Button>
                </Popconfirm>
            :
                <Button onClick={() => open(uninstallLink)}>Uninstall</Button>
        :
            allowAutomatedInstall ?
                <Popconfirm placement="topRight" title={confirmTitle} onConfirm={this.install(row).bind(this)} okText="Install" cancelText="Cancel">
                    <Button type="primary" loading={row.loading}>Install</Button>
                </Popconfirm>
            :
                <Button type="primary" onClick={() => open(installLink)}>Install</Button>

        return (
            <div>
                { actionButton }
                <div className={styles.actionLinks}>
                    { row.dependency.dependencyLink ?
                                <Tooltip placement="topRight" title="Homepage">
                                    <Icon type="home" onClick={() => open(row.dependency.dependencyLink)}/>
                                </Tooltip>
                        :
                            false
                    }
                    { row.dependency.dependencyDocumentation ?
                            <Tooltip placement="topRight" title="Documentation">
                                <Icon type="book" onClick={() => open(row.dependency.dependencyDocumentation)}/>
                            </Tooltip>
                        :
                            false
                    }
                </div>
            </div>
        )
    }

    render()
    {
        const columns = [{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            className: styles.statusCol,
            render: (text, row) => (
                <div>
                { row.dependency._installed ? 
                    <Icon type="check-circle-o" className={styles.installed} />
                    :
                    <Icon type="exclamation-circle" className={styles.notInstalled} />
                }
                </div>
            )
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: styles.infoCol,
            render: (text, row) => (
                <div>
                    { row.dependency.dependencyLink ?
                        <span className={styles.dependencyName}
                              onClick={() => open(row.dependency.dependencyLink)}>
                            {text}
                            <span className={styles.optional}>
                                {row.dependency.required ? 'Required' : 'Optional'}
                            </span>
                        </span>
                        :
                        {text}
                    }
                    { row.dependency.dependencyDescription ?
                        <p className={styles.dependencyDescription}>{row.dependency.dependencyDescription}</p>
                        :
                        false
                    }
                </div>
            )
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
