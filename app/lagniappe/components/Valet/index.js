import React, { Component } from 'react'
import { Spin, Tag, Row,
         Col, Table, Icon
                          } from 'antd'

import Status               from 'lagniappe/commands/Valet/Status'

import styles               from './Valet.scss'

export default class Valet extends Component
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
            status: this.status.slice(0)
        }
    }

    componentDidMount()
    {
        this.loadValetInformation()
    }

    loadValetInformation()
    {
        this.setState(Object.assign({}, this.state, {
            loading: true
        }))
        const statusCommand = new Status()
        statusCommand.execute(this.status.slice(0)).then((status) => {
            this.setState(Object.assign({}, this.state, {
                loading: false,
                status,
            }))
        })
    }

    renderStatus()
    {
        const serviceStatus = this.state.status
        console.log(serviceStatus)
        return (
            <div>
                <h2>Status</h2>
                <ul>
                {serviceStatus.map(service => {
                    console.log(service)
                    return (
                        <li key={service.service}>
                            <strong>{service.niceName}:</strong>
                            &nbsp;
                            <Tag color={service.status ? 'green' : 'red'} className={styles.ServiceStatusTag}>
                                {service.status ? 'On' : 'Off'}
                            </Tag>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }

    render()
    {
        const loading = this.state.loading
        const links = this.state.links
        const domain = this.state.domain
        const paths = this.state.paths
        const status = this.renderStatus()

        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <h1>
                            <Icon type="bar-chart" /> Laravel Valet
                        </h1>
                    </Col>
                    <Col span={12}>
                        {!domain ? false :
                        <p><strong>Active</strong> on <Tag>.{domain}</Tag></p>
                    }
                    </Col>
                </Row>
                { loading ? <Spin /> :
                    <Row gutter={16}>
                        <Col span={16}>
                            <h2>Links</h2>
                        </Col>
                        <Col span={8}>
                            {status}
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}
