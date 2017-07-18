import React, { Component } from 'react'
import { Spin, Tag, Row,
         Col, Table, Icon,
         Button, Menu,
         Dropdown         } from 'antd'

import open                 from 'open'

import Status               from 'lagniappe/commands/Valet/Status'
import Domain               from 'lagniappe/commands/Valet/Domain'
import Links                from 'lagniappe/commands/Valet/Links'

import styles               from './Valet.scss'

const MenuItem = Menu.Item
const MenuDivider = Menu.Divider
const DropdownButton = Dropdown.Button

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
            loading: true,
            domain: null,
            status: this.status.slice(0),
            paths: [],
            links: [],
        }))

        const statusCommand = new Status()
        statusCommand.execute(this.status.slice(0)).then((status) => {
            this.setState(Object.assign({}, this.state, {
                status,
            }))
        })

        const domainCommand = new Domain()
        domainCommand.execute().then(domain => {
            this.setState(Object.assign({}, this.state, {
                domain,
            }))
        })

        const linksCommand = new Links()
        linksCommand.execute().then(links => {
            this.setState(Object.assign({}, this.state, {
                links,
                loading: false,
            }))
        })
    }

    renderStatus()
    {
        const serviceStatus = this.state.status
        return (
            <div>
                <h2>Status</h2>
                {serviceStatus.map(service => {
                    return (
                        <Row key={service.service} className="t-spacing">
                            <strong>{service.niceName}:</strong>
                            &nbsp;
                            <Tag color={service.status ? 'green' : 'red'} className={styles.ServiceStatusTag}>
                                {service.status ? 'On' : 'Off'}
                            </Tag>
                        </Row>
                    )
                })}
            </div>
        )
    }

    renderSiteActions(site)
    {
        const MenuClickHandler = e => {
            console.log(e)
        }
        const ActionsMenu = (
            <Menu onClick={MenuClickHandler}>
                <MenuItem key="share"><Icon type="cloud" /> Share</MenuItem>
                <MenuItem key={site.secure ? 'unsecure' : 'secure'}>
                    {site.secure ? <Icon type="unlock" /> : <Icon type="lock" />}
                    {site.secure ? ' Unsecure' : ' Secure'}
                </MenuItem>
                <MenuDivider />
                <MenuItem key="unlink"><Icon type="close"/> Unlink</MenuItem>
            </Menu>
        )
        return (
            <Dropdown overlay={ActionsMenu}>
                <Button>
                    Actions <Icon type="down" />
                </Button>
            </Dropdown>
        )
    }

    renderLinks()
    {
        let i = 0
        let domain = this.state.domain
        return this.state.links.map(link => {
            return (
                <Row key={'valetLink' + i++}>
                    <Col span={18}>
                        <b><a onClick={() => open(link.url)}>{link.site}</a></b>
                        <small>.{domain}</small>
                        <p className={styles.Path}>{link.path}</p>
                    </Col>
                    <Col span={6}>
                        {this.renderSiteActions(link)}
                    </Col>
                </Row>
            )
        })
    }

    render()
    {
        const loading = this.state.loading
        const domain = this.state.domain
        const paths = this.state.paths
        const status = this.renderStatus()
        const links = this.renderLinks()

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
                        <div className={styles.Domain}>
                            <strong>Domain:</strong> <Tag>.{domain}</Tag>
                        </div>
                    }
                    </Col>
                </Row>
                <Row className="t-spacing--small">
                    <Button onClick={this.loadValetInformation.bind(this)} icon="retweet" size="small">Reload</Button>
                </Row>
                { loading ? <Spin /> :
                    <Row gutter={16} className="t-spacing--large">
                        <Col span={16}>
                            <h2>Links</h2>
                            {links}
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
