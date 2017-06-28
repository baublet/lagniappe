import React, { Component } from 'react'
import { Table, Collapse, Icon } from 'antd'

import DependenciesTable from 'lagniappe/components/DependenciesTable'

const CollapsePanel = Collapse.Panel

class Config extends Component {

    render() {
        const className = ''
        return (
            <div className={className}>
                <h1><Icon type="setting" /> Configuration</h1>
                <Collapse defaultActiveKey={['dependencies']}>
                    <CollapsePanel header="Application Dependencies" key="dependencies">
                        <DependenciesTable />
                    </CollapsePanel>
                </Collapse>
            </div>
        )
    }

}

export default Config
