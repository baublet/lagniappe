import React, { Component } from 'react'
import { Table, Button, Popconfirm, Row, Col, Icon } from 'antd'

import DockerImageList from 'commands/Docker/Image/List'

import styles from './Docker.scss'

export const ORDER_SIZES = ['SECONDS AGO', 'MINUTES AGO', 'HOURS AGO', 'DAYS AGO', 'MONTHS AGO', 'YEARS AGO', ' KB', ' MB', ' GB', ' TB']

class Images extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            dockerImages: [],
            loading: false
        }
    }

    componentWillMount()
    {
        this.loadImages()
    }

    loadImages()
    {
        this.setState({
            loading: true,
            dockerImages: this.state.dockerImages.slice(0)
        })
        const dockerImagesCommand = new DockerImageList()
        dockerImagesCommand.execute().then((list) => {
            this.setState({
                loading: false,
                dockerImages: list
            })
        })
    }

    getOrderPosition(key)
    {
        const keyCap = key.toUpperCase()
        for(let i = 0; i < ORDER_SIZES.length; i++) {
            if(keyCap.indexOf(ORDER_SIZES[i]) > -1) return i
        }
        return -1
    }

    render()
    {
        const images = this.state.dockerImages || []
        const loading = this.state.loading

        const tableData = images.map((image, i) => Object.assign({}, image, {key: i}))
        const tableColumns = []

        for(let key in images[0]) {
            tableColumns.push({
                title: key,
                dataIndex: key,
                key: key,
                sorter: (a, b) => {
                    const aVal = this.getOrderPosition(a[key])
                    const bVal = this.getOrderPosition(b[key])

                    // This uses the getOrderPosition function to find out
                    // if there are other metrics than name (e.g., days/months/
                    // years, or MB/GB/TB), compares them first, then falls back
                    // to normal ordering if they match or neither have the
                    // qualitative metrics.
                    // 
                    // So 7 minutes will always be less than 1 month. But when we
                    // compares 1 month to 2 months, we then fall back to alpha
                    // sorting so that 2 months > 1 month.
                    if(aVal > -1 && bVal > -1 && aVal !== bVal)
                    {
                        return aVal - bVal
                    }

                    const aAbs = a[key].toUpperCase()
                    const bAbs = b[key].toUpperCase()
                    if (aAbs < bAbs) {
                        return -1
                    }
                    if (aAbs > bAbs) {
                        return 1
                    }
                    return 0
                }
            })
        }

        return (
            <div>
                <Table dataSource={tableData} columns={tableColumns} />
            </div>
        )
    }
}

export default Images
