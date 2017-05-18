import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { browserHistory } from 'react-router'

import docTree from 'documentation.js'

import styles from './Navigation.scss'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const MenuDivider = Menu.Divider

export default class Navigation extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            tree: docTree.getTree()
        }
    }

    docsMenu(tree) {
        let nodes = []

        for (var child in tree) {
            if (!tree.hasOwnProperty(child) || child == '_paths') continue
            const title = <span><Icon type="folder" /> {child}</span>
            nodes.push(
                <SubMenu key={child} title={title}>
                    {this.docsMenu(tree[child])}
                </SubMenu>
            )
        }

        for(let i = 0; i < tree._paths.length; i++) {
            nodes.push(
                <MenuItem key={tree._paths[i].url}><Icon type="file" /> {tree._paths[i].display}</MenuItem>
            )
        }

        return nodes
    }

    navigateTo({item, key, keyPath}) {
        const route = key
        if(this.props.router.location.pathname == route) return
        this.props.router.push(key)
    }

    render() {
        const navigateTo = this.navigateTo.bind(this)
        const docsMenu = this.docsMenu(this.state.tree)
        return(
            <Menu theme='dark' className={styles.navigation} mode="inline" onClick={navigateTo}>
              <SubMenu key="manage" title={<span><Icon type="dot-chart" /><span>DM Team</span></span>}>
                <MenuItem key="/">Environment</MenuItem>
                <MenuItem key="/config">Configuration</MenuItem>
                <MenuItem key="/trouble">Troubleshooting</MenuItem>
                <MenuItem key="/apps">Applications</MenuItem>
              </SubMenu>
              <SubMenu key="devs" title={<span><Icon type="code-o" /><span>Development</span></span>}>
                <MenuItem key="/dev-dash">Dashboard</MenuItem>
                <MenuItem key="/provision">Provisioner</MenuItem>
                <MenuItem key="/git">Git</MenuItem>
                <MenuItem key="/dbs">Databases</MenuItem>
                <MenuItem key="/logs">Logs</MenuItem>
                <MenuItem key="/email">Email</MenuItem>
                <MenuItem key="/testing">Automated Tests</MenuItem>
              </SubMenu>
              <SubMenu key="qa" title={<span><Icon type="smile-o" /><span>Quality Assurance</span></span>}>
                <MenuItem key="/open-tickets">Tickets</MenuItem>
                <MenuItem key="/dbs">Databases</MenuItem>
                <MenuItem key="/testing">Automated Tests</MenuItem>
              </SubMenu>
              <SubMenu key="docs" title={<span><Icon type="copy" /><span>Documentation</span></span>}>
                <MenuItem key="/docs">Home</MenuItem>
                <MenuDivider />
                {docsMenu}
              </SubMenu>
            </Menu>
        )
    }

}
