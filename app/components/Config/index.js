import React, { Component } from 'react'
import { Table, Collapse, Icon } from 'antd'

import DependenciesTable from 'components/DependenciesTable'

class Config extends Component {

    render() {
        const className = ''
        return (
            <div className={className}>
                <h1><Icon type="setting" /> Configuration</h1>
                <Collapse defaultActiveKey={['dependencies']}>
                    <Collapse.Panel header="Application Dependencies" key="dependencies">
                        <DependenciesTable />
                    </Collapse.Panel>
                </Collapse>
            </div>
        )
    }

}

export default Config
