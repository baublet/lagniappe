import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon, Menu, Popconfirm } from 'antd'

import config from 'config'
import styles from './Git.scss'

import Pull from 'lagniappe/commands/Git/Pull'
import Push from 'lagniappe/commands/Git/Push'
import ResetHardWithMaster from 'lagniappe/commands/Git/ResetHardWithMaster'
import Undo from 'lagniappe/commands/Git/Undo'
import Status from 'lagniappe/commands/Git/Status'

const MenuItem = Menu.Item

export default class Operations extends Component
{
    resetHard()
    {
        const reset = new ResetHardWithMaster()
        reset.execute(config.cwd).then(() => { this.props.refresh() })
    }

    pull()
    {
        const pull = new Pull()
        pull.execute(config.cwd).then(() => { this.props.refresh() })
    }

    push()
    {
        const push = new Push()
        push.execute(config.cwd)
    }

    undo()
    {
        const undo = new Undo()
        undo.execute(config.cwd).then(() => { this.props.refresh() })
    }

    status()
    {
        const status = new Status()
        status.execute(config.cwd)
    }

    menuSelect({ item, key, selectedKeys })
    {
        switch(key) {
            case "resetHardHead":
                this.resetHard()
                break
            case "pull":
                this.pull()
                break
            case "push":
                this.push()
                break
            case "undoLastCommit":
                this.undo()
                break
            case "status":
                this.status()
                break
        }
    }

    render()
    {
        return (
            <div className="b-spacing--large">
                <h3>Operations</h3>
                <Menu className={styles.operationsMenu} selectedKeys={[]} onSelect={this.menuSelect.bind(this)}>
                    <MenuItem key="status">
                        <Icon type="file-text" /> Status
                    </MenuItem>
                    <MenuItem key="pull">
                        <Icon type="swap-left" /> Pull from Origin
                    </MenuItem>
                    <MenuItem key="push">
                        <Icon type="swap-right" /> Push to Origin
                    </MenuItem>
                    <MenuItem key="resetHardHead">
                        <Icon type="retweet" /> Synchronize with Origin
                    </MenuItem>
                    <MenuItem key="undoLastCommit">
                        <Icon type="rollback" /> Undo Last Commit
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}
