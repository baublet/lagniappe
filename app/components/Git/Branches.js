import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button, Spin, Input } from 'antd'

import AllBranches from 'commands/Git/AllBranches'

import config from 'config'
import styles from './Git.scss'

export default class Branches extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            branches: <Spin />,
            search: false
        }
    }

    componentDidMount() {
        this.getBranches()
    }

    switchToBranchFunction(branch) {
        return (e) => {
            e.preventDefault()
            this.props.switchToBranch(branch)
        }
    }

    renderBranches() {
        const branches = this.state.branches
        if(!branches.length) return branches

        const branchesElements = []
        const searchQuery = this.state.search

        branches.forEach(branch => {

            if(searchQuery && !branch.name.includes(searchQuery)) {
                return
            }

            const className = branch.current ? styles.branch + ' ' + styles.currentBranch : styles.branch
            branchesElements.push(
                    <a href="#" onClick={this.switchToBranchFunction(branch.name)}
                     title="Switch to this branch" className={className} key={branch.name}>
                        {branch.name}
                    </a>
            )
        })

        return branchesElements
    }

    getBranches() {
        let branches = new AllBranches()
        this.setState({
            branches: <Spin />,
            search: false
        })
        branches.execute(config.cwd).then((branches) => {
            const branchesMarkup = branches
            this.setState({
                branches: branchesMarkup,
                search: false
            })
        })
    }

    searchForBranch(branch) {
        this.setState({
            search: branch,
            branches: this.state.branches
        })
    }

    render() {
        const branches = this.renderBranches()

        return (
            <div>
                <h3>Branches</h3>
                <Input.Search
                    placeholder="Search for a branch"
                    style={{ width: '100%' }}
                    onSearch={this.searchForBranch.bind(this)}
                    className="b-spacing--tiny"
                  />
                <div className="inlineWindow">{branches}</div>
            </div>
        )
    }

}
