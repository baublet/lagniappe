import React, { Component } from 'react'
import { Spin, Tag, Row,
         Col, Table, Icon,
         Button, Menu, Alert,
         Dropdown         } from 'antd'

import open                 from 'open'

import Domain               from 'lagniappe/commands/Valet/Domain'
import Links                from 'lagniappe/commands/Valet/Links'
import Share                from 'lagniappe/commands/Valet/Share'

import styles               from './Valet.scss'

import ValetLink            from 'lagniappe/components/Valet/Link'
import ValetStatus          from 'lagniappe/components/Valet/Status'

const MenuItem = Menu.Item
const MenuDivider = Menu.Divider
const DropdownButton = Dropdown.Button

export default class Valet extends Component
{

    constructor(props)
    {
        super(props)

        this.state = {
            loading: true,
            links: [],
            domain: null,
            paths: [],
            share: {},
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
            paths: [],
            links: [],
            share: {},
        }))

        const promises = []

        const domainCommand = new Domain()
        promises.push(domainCommand.execute().then(domain => {
            this.setState(Object.assign({}, this.state, {
                domain,
            }))
        }))

        const linksCommand = new Links()
        promises.push(linksCommand.execute().then(links => {
            this.setState(Object.assign({}, this.state, {
                links,
            }))
        }))

        // This waits for all of the above promises, which we push into the array
        // called "promises", resolve. Once they resolve, we set the state as no
        // longer loading.
        Promise.all(promises).then(() => {
            this.setState(Object.assign({}, this.state, {
                loading: false,
            }))
        })
    }

    handleShare(sitePath)
    {
        const shareCommand = new Share()
        this.setState(Object.assign({}, this.state, {
            share: {}
        }))
        shareCommand.execute(sitePath).then(url => {
            this.setState(Object.assign({}, this.state, {
                share: {
                    path: sitePath,
                    url,
                }
            }))
        })
    }

    renderLinks()
    {
        let i = 0
        let domain = this.state.domain
        return this.state.links.map(link => {
            return (
                <ValetLink {...link} domain={domain} key={'valetLink' + i++}
                          shared={link.path == this.state.share.path} shareUrl={this.state.share.url}
                          shareHandler={this.handleShare.bind(this)} />
            )
        })
    }

    render()
    {
        const loading = this.state.loading
        const domain = this.state.domain
        const paths = this.state.paths
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
                        <div className={styles.Domain + ' float--right'}>
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
                            { !links.length ?
                                <Alert message="No links, yet." showIcon type="info" />
                            :
                                links
                            }
                        </Col>
                        <Col span={8}>
                            <ValetStatus />
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}
