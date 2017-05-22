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
                    <TabPane tab="Dashboard" key="0">
                        Docker dashboard
                    </TabPane>
                    <TabPane tab="Containers" key="2">Nothing Here Yet</TabPane>
                    <TabPane tab="Images" key="1">
                        <Images />
                    </TabPane>
                </Tabs>
            </div>
        )
    }

}

export default Docker
