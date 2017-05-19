import React, { Component } from 'react'
import { Icon } from 'antd'

import Images from './Images'

import styles from './Docker.scss'

class Docker extends Component {

    render()
    {
        return (
            <div>
                <h1><Icon type="hdd" /> Docker</h1>
                <Images />
            </div>
        )
    }

}

export default Docker
