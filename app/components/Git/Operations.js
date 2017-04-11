import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon, Menu, Popconfirm } from 'antd'

import config from 'config'
import styles from './Git.scss'


export default class Operations extends Component
{

    resetHardHead() {
        alert('hey')
    }

    render() {
        return (
            <div className="b-spacing--large">
                <h3>Operations</h3>
                <Menu className={styles.operationsMenu} selectedKeys={[]}>
                    <Menu.Item>
                        <Icon type="swap-left" /> Pull from Origin
                    </Menu.Item>
                    <Menu.Item>
                        <Icon type="swap" /> Push to Origin
                    </Menu.Item>
                    <Menu.Item>
                        <Icon type="retweet" /> Synchronize with Origin
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
