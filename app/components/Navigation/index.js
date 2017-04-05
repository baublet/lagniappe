import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { browserHistory } from 'react-router'

import docTree from 'documentation.js'

import styles from './Navigation.scss'

const SubMenu = Menu.SubMenu

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
                <Menu.Item key={tree._paths[i].url}><Icon type="file" /> {tree._paths[i].display}</Menu.Item>
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
                <Menu.Item key="/">Environment</Menu.Item>
                <Menu.Item key="/config">Configuration</Menu.Item>
                <Menu.Item key="/trouble">Troubleshooting</Menu.Item>
                <Menu.Item key="/apps">Applications</Menu.Item>
              </SubMenu>
              <SubMenu key="devs" title={<span><Icon type="code-o" /><span>Development</span></span>}>
                <Menu.Item key="/dev-dash">Dashboard</Menu.Item>
                <Menu.Item key="/provision">Provisioner</Menu.Item>
                <Menu.Item key="/dbs">Databases</Menu.Item>
                <Menu.Item key="/logs">Logs</Menu.Item>
                <Menu.Item key="/email">Email</Menu.Item>
                <Menu.Item key="/testing">Automated Tests</Menu.Item>
              </SubMenu>
              <SubMenu key="qa" title={<span><Icon type="smile-o" /><span>Quality Assurance</span></span>}>
                <Menu.Item key="/open-tickets">Tickets</Menu.Item>
                <Menu.Item key="/dbs">Databases</Menu.Item>
                <Menu.Item key="/testing">Automated Tests</Menu.Item>
              </SubMenu>
              <SubMenu key="docs" title={<span><Icon type="copy" /><span>Documentation</span></span>}>
                <Menu.Item key="/docs">Home</Menu.Item>
                <Menu.Divider />
                {docsMenu}
              </SubMenu>
            </Menu>
        )
    }

}
