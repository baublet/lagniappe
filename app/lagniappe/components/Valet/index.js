import React, { Component } from 'react'
import { Spin, Tag, Row,
         Col, Table, Icon,
         Button, Menu, Alert,
         Dropdown         } from 'antd'

import open                 from 'open'

import Domain               from 'lagniappe/commands/Valet/Domain'
import Links                from 'lagniappe/commands/Valet/Links'
import Share                from 'lagniappe/commands/Valet/Share'
import ValetCommands        from 'lagniappe/commands/Valet'

import styles               from './Valet.scss'

import ValetLink            from 'lagniappe/components/Valet/Link'
import ValetStatus          from 'lagniappe/components/Valet/Status'

const MenuItem = Menu.Item
const MenuDivider = Menu.Divider
const DropdownButton = Dropdown.Button
const ButtonGroup = Button.Group

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

        this.valetCommands = new ValetCommands()
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

    renderActions()
    {
        const startHandler = () => {
            this.valetCommands.start()
            this.loadValetInformation()
        }
        const restartHandler = () => {
            this.valetCommands.restart()
            this.loadValetInformation()
        }
        const stopHandler = () => {
            this.valetCommands.stop()
            this.loadValetInformation()
        }
        return (
            <ButtonGroup>
                <Button onClick={this.loadValetInformation.bind(this)} icon="retweet" size="small">Reload</Button>
                <Button onClick={startHandler.bind(this)} icon="play-circle" size="small">Start</Button>
                <Button onClick={restartHandler.bind(this)} icon="sync" size="small">Restart</Button>
                <Button onClick={stopHandler.bind(this)} icon="pause-circle" size="small">Stop</Button>
            </ButtonGroup>
        )
    }

    render()
    {
        const loading = this.state.loading
        const domain = this.state.domain
        const paths = this.state.paths
        const links = this.renderLinks()
        const valetActions = this.renderActions()

        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <h1>
                            <Icon type="car" /> Laravel Valet
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
                    {valetActions}
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
