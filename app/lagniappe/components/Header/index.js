import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Header.scss'
import { Layout, Row, Col } from 'antd'

import { Icon, Tooltip } from 'antd'

const LayoutHeader = Layout.Header

export default class Header extends Component {

    renderCustomHeader()
    {
        const props = this.props
        try {
            const CustomHeader = require('components/Header')
            return <CustomHeader {...props} />
        } catch(e) {
            if(!e.message.includes('Cannot find module "components/Header"'))
            {
                console.error(e)
            }
            return (
                <Row>
                    <Col span={8}>
                        <Link to="/" className="header__logo">langiappe</Link>
                    </Col>
                    <Col span={16} className={styles.devopsHealth}>
                        <Link to="/config">
                            <Icon type="setting" />
                        </Link>
                    </Col>
                </Row>
            )
        }
    }

    render() {
        return (
            <LayoutHeader className={styles.header}>
                {this.renderCustomHeader()}
            </LayoutHeader>
        )
    }
}
