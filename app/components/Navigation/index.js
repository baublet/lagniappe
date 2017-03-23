import React, { Component } from 'react'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu

export default class Navigation extends Component
{

    render() {
        return(
            <Menu theme='dark' style={{ width: '100%' }} mode="inline">
              <SubMenu key="manage" title={<span><Icon type="dot-chart" /><span>DM Team</span></span>}>
                <Menu.Item key="/">Environment</Menu.Item>
                <Menu.Item key="/config">Configuration</Menu.Item>
                <Menu.Item key="/trouble">Troubleshooting</Menu.Item>
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
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
        )
    }

}
