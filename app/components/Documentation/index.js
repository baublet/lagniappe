import React, { Component } from 'react'
import { Table, Button, Popconfirm, Row, Col } from 'antd'
import Tree from './Tree'

import styles from './Documentation.scss'
import docTree from 'documentation.js'

class Documentation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tree: docTree.getTree()
        }
    }

    render() {
        return (
            <div>
                <h1>Docs</h1>
                <Row gutter={16}>
                    <Col span={16}>
                        Stuff Here
                        {this.props.children}
                    </Col>
                    <Col span={8} className={styles.treeWrapper}>
                        <Tree tree={this.state.tree} />
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Documentation
