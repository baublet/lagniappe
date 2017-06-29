import React, { Component } from 'react'
import { Table, Spin, Icon, Button, Menu, Dropdown, Popconfirm, Alert } from 'antd'

import DockerImageList from 'lagniappe/commands/Docker/Image/List'
import DockerImageRemove from 'lagniappe/commands/Docker/Image/Remove'
import DockerImageRemoveAll from 'lagniappe/commands/Docker/Image/RemoveAll'
import DockerImagePrune from 'lagniappe/commands/Docker/Image/Prune'
import DockerImageInfo from 'lagniappe/commands/Docker/Image/Info'

import styles from './Docker.scss'

export const ORDER_SIZES = ['SECONDS AGO', 'MINUTES AGO', 'HOURS AGO', 'DAYS AGO', 'MONTHS AGO', 'YEARS AGO', ' KB', ' MB', ' GB', ' TB']

const ButtonGroup = Button.Group
const MenuItem = Menu.Item

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

    shouldComponentUpdate(nextProps, nextState)
    {
        // We only do manual updates to this component
        return false
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
            this.forceUpdate()
        })
    }

    reload()
    {
        this.forceUpdate()
        this.loadImages()
    }

    removeImage(imageId)
    {
        this.setState({
            loading: true,
            dockerImages: this.state.dockerImages.slice(0)
        })
        this.forceUpdate()
        const remover = this.remover || new DockerImageRemove()
        remover.execute(imageId, true).then( success => {
            if(success === true) {
                this.reload()
            } else {
                alert('Error! ' + success)
            }
        })
    }

    imageInfo(imageId)
    {
        const infoHandler = this.infoHandler || new DockerImageInfo()
        infoHandler.execute(imageId).then( history => {
            console.log(history)
        })
    }

    removeAll()
    {
        const remover = new DockerImageRemoveAll()
        remover.execute().then( () => {
            this.reload()
        })
    }

    prune()
    {
        const remover = new DockerImagePrune()
        remover.execute().then( () => {
            this.reload()
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

    sorterFor(key)
    {
        return (a, b) => {
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
    }

    rowAction(index, row)
    {
        const handleClick = ({key}) => {
            switch(key) {
                case 'info':
                    this.imageInfo(row['IMAGE ID'])
                    break
                case 'remove':
                    this.removeImage(row['IMAGE ID'])
                    break
            }
        }
        const menu = (
            <Menu onClick={handleClick.bind(this)}>
                <MenuItem key="info"><Icon type="question" /> Info</MenuItem>
                <MenuItem key="remove"><Icon type="close" /> Remove</MenuItem>
            </Menu>
        )
        return (
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                <Button icon="down" shape="circle" size="small" />
            </Dropdown>
        )
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
                sorter: this.sorterFor(key)
            })
        }

        tableColumns.push({
            title: '',
            dataIndex: 'actions',
            render: this.rowAction.bind(this)
        })

        const table =   tableData.length ?
                            <Table dataSource={tableData} columns={tableColumns} />
                        :
                            <Alert message="No Docker images, yet." showIcon type="info" />

        return (
            <div>
                <div className={styles.globalActionsAndSearch}>
                    <ButtonGroup>
                        <Button onClick={this.reload.bind(this)} icon="reload" type="primary">Reload</Button>
                        <Popconfirm placement="top" title="Are you sure you want to remove dangling volumes? This cannot be undone."
                                    onConfirm={this.prune.bind(this)} okText="Yes" cancelText="No"
                                    placement="topRight">
                            <Button type="primary" icon="close">Prune</Button>
                        </Popconfirm>
                        <Popconfirm placement="top" title="Are you sure you want to remove all images? This cannot be undone."
                                    onConfirm={this.removeAll.bind(this)} okText="Yes" cancelText="No"
                                    placement="topRight">
                            <Button type="primary" icon="close-circle">Remove All</Button>
                        </Popconfirm>
                    </ButtonGroup>
                </div>
                { loading ?
                    <Spin />
                :
                    table
                }
            </div>
        )
    }
}

export default Images
