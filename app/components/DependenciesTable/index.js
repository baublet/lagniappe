import React, { Component } from 'react'
import { Table, Button } from 'antd'

import Dependencies from 'dependencies'

import styles from './DependenciesTable.scss'

class DependenciesTable extends Component {

    constructor(props) {
        super(props)
        console.log(Dependencies)
    }

    render() {

        const dependencies = Dependencies.getDependencies()

        let data = []
        let i = 0
        dependencies.forEach(dependency => {
            data.push({
                key: i++,
                name: dependency.dependencyName,
                status: dependency._installed == false ? 'Not Installed' : 'Installed',
                dependency
            })
        })

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            className: styles.toolbar,
            render(text, dependency) {
                return (
                    <div>

                        <span className={styles.status}>
                            {dependency._installed == false ? 'Not Installed' : 'Installed'}
                        </span>

                        { dependency._installed == false ?
                            <Button type="primary">Install</Button>
                          :
                            <Button>Uninstall</Button>
                        }

                    </div>
                )
            }
        }]


        const className = ''
        return (
            <div className={className}>
                <Table dataSource={data} columns={columns} showHeader={false} pagination={false} size="middle" />
            </div>
        )
    }

}

export default DependenciesTable
