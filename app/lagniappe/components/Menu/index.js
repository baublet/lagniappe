import React, { Component } from 'react'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

export default class Nav extends Component
{

    render() {
        return(
            <Menu
              theme='dark'
              style={{ width: '100%' }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="vertical"
            >
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                <MenuItem key="1">Option 1</MenuItem>
                <MenuItem key="2">Option 2</MenuItem>
                <MenuItem key="3">Option 3</MenuItem>
                <MenuItem key="4">Option 4</MenuItem>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
                <MenuItem key="5">Option 5</MenuItem>
                <MenuItem key="6">Option 6</MenuItem>
                <SubMenu key="sub3" title="Submenu">
                  <MenuItem key="7">Option 7</MenuItem>
                  <MenuItem key="8">Option 8</MenuItem>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                <MenuItem key="9">Option 9</MenuItem>
                <MenuItem key="10">Option 10</MenuItem>
                <MenuItem key="11">Option 11</MenuItem>
                <MenuItem key="12">Option 12</MenuItem>
              </SubMenu>
            </Menu>
        )
    }

}
