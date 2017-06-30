import React, { Component } from 'react'
import { Menu, Icon }       from 'antd'
import { browserHistory }   from 'react-router'
import docTree              from 'documentation.js'
import styles               from './Navigation.scss'
import menuItems            from 'menu.js'

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

    customMenuItems()
    {
        return menuItems.map(item => {
            const title = !item.icon ? item.title : <span><Icon type={item.icon} />{item.title}</span>
            return (
                <SubMenu key={item.url} title={title}>
                    { item.url || (!item.items || !item.items.length) ? false :
                        item.items.map(subItem => <MenuItem key={subItem.url}>{subItem.title}</MenuItem>)
                    }
                </SubMenu>
            )
        })
    }

    render() {
        const navigateTo = this.navigateTo.bind(this)
        const docsMenu = this.docsMenu(this.state.tree)
        return(
            <Menu theme='dark' className={styles.navigation} mode="inline" onClick={navigateTo}>
              {this.customMenuItems()}
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
