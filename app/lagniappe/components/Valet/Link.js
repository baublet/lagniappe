import React, { Component } from 'react'
import { Spin, Tag, Row,
         Col, Table, Icon,
         Button, Menu, Alert,
         Dropdown         } from 'antd'

import open                 from 'open'

import Status               from 'lagniappe/commands/Valet/Status'
import Domain               from 'lagniappe/commands/Valet/Domain'
import Links                from 'lagniappe/commands/Valet/Links'
import Share                from 'lagniappe/commands/Valet/Share'

import styles               from './Valet.scss'

const MenuItem = Menu.Item
const MenuDivider = Menu.Divider
const DropdownButton = Dropdown.Button

export default class Link extends Component
{
    renderSiteActions(site)
    {
        const MenuClickHandler = e => {
            switch(e.key)
            {
                case 'share':
                    this.props.shareHandler(site.path)
                    break
                case 'secure':
                    break
                case 'unsecure':
                    break
                case 'unlink':
                    break
            }
        }
        const ActionsMenu = (
            <Menu onClick={MenuClickHandler}>
                {site.ssl || site.shared ? false :
                    <MenuItem key="share"><Icon type="cloud" /> Share</MenuItem>
                }
                <MenuItem key={site.ssl ? 'unsecure' : 'secure'}>
                    {site.ssl ? <Icon type="unlock" /> : <Icon type="lock" />}
                    {site.ssl ? ' Unsecure' : ' Secure'}
                </MenuItem>
                <MenuDivider />
                <MenuItem key="unlink"><Icon type="close"/> Unlink</MenuItem>
            </Menu>
        )
        return (
            <Dropdown overlay={ActionsMenu}>
                <Button className="float--right">
                    Actions <Icon type="down" />
                </Button>
            </Dropdown>
        )
    }

    render()
    {
        const   site = this.props.site,
                ssl = this.props.ssl,
                url = this.props.url,
                path = this.props.path,
                shared = this.props.shared,
                shareUrl = this.props.shareUrl,
                domain = this.props.domain

        return(
            <div className={styles.linkRow}>
                <Row>
                    <Col span={18}>
                        <b><a onClick={() => open(url)}>{site}</a></b>
                        <small>.{domain}</small>
                        <p className={styles.Path}>{path}</p>
                    </Col>
                    <Col span={6}>
                        {this.renderSiteActions({site, ssl, url, path, shared})}
                    </Col>
                </Row>
                { !shared ? false :
                  <Alert showIcon message={<span>Sharing at <a onClick={() => {open(shareUrl)}}>{shareUrl}</a></span>} type="info" className="t-spacing--small" /> }
            </div>
        )
    }
}
