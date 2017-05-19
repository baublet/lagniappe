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
              <SubMenu key="devs" title={<span><Icon type="code-o" /><span>Development</span></span>}>
                <MenuItem key="/dev-dash">Dashboard</MenuItem>
                <MenuItem key="/docker">Docker</MenuItem>
                <MenuItem key="/git">Git</MenuItem>
              </SubMenu>
              <SubMenu key="docs" title={<span><Icon type="copy" /><span>Documentation</span></span>}>
                <MenuItem key="/docs">Home</MenuItem>
                <MenuDivider />
                {docsMenu}
              </SubMenu>
              <MenuItem key="/config">Configuration</MenuItem>
            </Menu>
        )
    }

}
