import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'

import Images from './Images'

import styles from './Docker.scss'

const TabPane = Tabs.TabPane

class Docker extends Component {

    render()
    {
        return (
            <div>
                <h1><Icon type="hdd" /> Docker</h1>
                <Tabs type="card" animated={false}>
                    <TabPane tab="Images" key="1">
                        <Images />
                    </TabPane>
                    <TabPane tab="Containers" key="2">Nothing Here Yet</TabPane>
                    <TabPane tab="Tab 3" key="3">And Nothing Here!</TabPane>
                </Tabs>
            </div>
        )
    }

}

export default Docker
