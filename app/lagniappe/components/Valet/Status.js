import React, { Component } from 'react'
import { Spin, Tag, Row,
         Col, Table, Icon,
         Button, Menu, Alert,
         Dropdown         } from 'antd'

import styles               from './Valet.scss'

import StatusCommand        from 'lagniappe/commands/Valet/Status'

export default class Status extends Component
{
    constructor(props)
    {
        super(props)

        // These services make up the core of Laravel Valet
        this.status = [
            {service: 'dnsmasq',   info: {}, status: 0, niceName: 'DNS Masq'},
            {service: 'mariadb',   info: {}, status: 0, niceName: 'MariaDB'},
            {service: 'nginx',     info: {}, status: 0, niceName: 'NGINX'},
            {service: 'php\\d\\d', info: {}, status: 0, niceName: 'PHP'},
        ]

        this.state = {
            loading: true,
            links: [],
            domain: null,
            paths: [],
            status: this.status.slice(0),
            share: {},
        }
    }

    componentDidMount()
    {
        this.loadStatus()
    }

    loadStatus()
    {
        this.setState(Object.assign({}, this.state, {
            loading: true,
            status: this.status.slice(0),
        }))

        const statusCommand = new StatusCommand()
        statusCommand.execute(this.status.slice(0)).then((status) => {
            this.setState(Object.assign({}, this.state, {
                loading: false,
                status,
            }))
        })
    }

    render()
    {
        const serviceStatus = this.state.status
        const loading = this.state.loading
        return (
            <div>
                <h2>Status</h2>
                { loading ? <Spin /> :
                    serviceStatus.map(service => {
                        return (
                            <Row key={service.service} className="t-spacing">
                                <strong>{service.niceName}:</strong>
                                &nbsp;
                                <Tag color={service.status ? 'green' : 'red'} className={styles.ServiceStatusTag}>
                                    {service.status ? 'On' : 'Off'}
                                </Tag>
                            </Row>
                        )
                    })
                }
            </div>
        )
    }
}
