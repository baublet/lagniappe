import React, { Component } from 'react'
import { Table, Spin, Icon, Button, Menu, Dropdown, Popconfirm, Alert } from 'antd'

import DockerContainerList from 'lagniappe/commands/Docker/Container/List'
import DockerContainerStart from 'lagniappe/commands/Docker/Container/Start'
import DockerContainerStop from 'lagniappe/commands/Docker/Container/Stop'
import DockerContainerRemove from 'lagniappe/commands/Docker/Container/Remove'
import DockerContainerRemoveAll from 'lagniappe/commands/Docker/Container/RemoveAll'
import DockerContainerPrune from 'lagniappe/commands/Docker/Container/Prune'

import generalSorterFor from 'lagniappe/utils/generalSorterFor'

import styles from './Docker.scss'

export const ORDER_SIZES = ['SECONDS AGO', 'MINUTES AGO', 'HOURS AGO', 'DAYS AGO', 'MONTHS AGO', 'YEARS AGO', ' KB', ' MB', ' GB', ' TB']

const ButtonGroup = Button.Group
const MenuItem = Menu.Item

class Containers extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            dockerContainers: [],
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
        this.loadContainers()
    }

    loading(loading = true)
    {
        const oldValue = this.state.loading
        this.setState(Object.assign({}, this.state, { loading }))
        if(loading !== oldValue) this.forceUpdate()
    }

    loadContainers()
    {
        this.setState({
            loading: true,
            dockerContainers: this.state.dockerContainers.slice(0)
        })
        this.forceUpdate()
        const dockerContainerCommand = new DockerContainerList()
        dockerContainerCommand.execute().then((list) => {
            this.setState({
                loading: false,
                dockerContainers: list
            })
            this.forceUpdate()
        })
    }

    reload()
    {
        this.loadContainers()
    }

    prune()
    {
        this.loading(true)
        const dockerContainerPrune = new DockerContainerPrune()
        dockerContainerPrune.execute().then(this.loadContainers.bind(this))
    }

    removeAll()
    {
        this.loading(true)
        const dockerContainerRemoveAll = new DockerContainerRemoveAll()
        dockerContainerRemoveAll.execute().then(this.loadContainers.bind(this))
    }

    removeContainer(container)
    {
        this.loading(true)
        const dockerContainerRemove = new DockerContainerRemove()
        dockerContainerRemove.execute(container).then(this.loadContainers.bind(this))
    }

    stopContainer(container)
    {
        this.loading(true)
        const dockerContainerStop = new DockerContainerStop()
        dockerContainerStop.execute(container).then(this.loadContainers.bind(this))
    }

    startContainer(container)
    {
        this.loading(true)
        const dockerContainerStart = new DockerContainerStart()
        dockerContainerStart.execute(container).then(this.loadContainers.bind(this))
    }

    rowAction(index, row)
    {
        const handleClick = ({key}) => {
            switch(key) {
                case 'remove':
                    this.removeContainer(row['CONTAINER ID'])
                    break
                case 'stop':
                    this.stopContainer(row['CONTAINER ID'])
                    break;
                case 'start':
                    this.startContainer(row['CONTAINER ID'])
                    break;
            }
        }

        const running = row['STATUS'].indexOf('Exited') == -1 ? true : false
        const toggleIcon = running ? 'pause-circle' : 'play-circle'
        const toggleKey = running ? 'stop' : 'start'
        const toggleText = running ? 'Stop' : 'Start'
        const menu = (
            <Menu onClick={handleClick.bind(this)}>
                <MenuItem key={toggleKey}><Icon type={toggleIcon} /> {toggleText}</MenuItem>
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
        const containers = this.state.dockerContainers || []
        const loading = this.state.loading

        const tableData = containers.map((container, i) => Object.assign({}, container, {key: i}))
        const tableColumns = []

        for(let key in containers[0]) {
            tableColumns.push({
                title: key,
                dataIndex: key,
                key: key,
                sorter: generalSorterFor(key)
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
                            <Alert message="No Docker containers, yet." showIcon type="info" />

        return (
            <div>
                <div className={styles.globalActionsAndSearch}>
                    <ButtonGroup>
                        <Button onClick={this.reload.bind(this)} icon="reload" type="primary">Reload</Button>
                        <Popconfirm placement="top" title="Are you sure you want to remove stopped containers? This cannot be undone."
                                    onConfirm={this.prune.bind(this)} okText="Yes" cancelText="No"
                                    placement="topRight">
                            <Button type="primary" icon="close">Prune</Button>
                        </Popconfirm>
                        <Popconfirm placement="top" title="Are you sure you want to remove all containers? This cannot be undone."
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

export default Containers
