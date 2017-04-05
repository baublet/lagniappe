import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd'

import styles from "./Documentation.scss"

class Tree extends Component {

    onSelect() {

    }

    renderTree(tree)
    {
        let nodes = []

        for (var child in tree) {
            if (!tree.hasOwnProperty(child) || child == '_paths') continue
            nodes.push(
                <li key={child} title={child}>
                    <Icon type="folder-open" className={styles.treeIcon} />
                    &nbsp;
                    <strong>{child}</strong>
                    {this.renderTree(tree[child])}
                </li>
            )
        }

        for(let i = 0; i < tree._paths.length; i++) {
            nodes.push(
                <li key={i}>
                    <Link to={tree._paths[i].url}>
                        <Icon type="file" className={styles.treeIcon} />
                        &nbsp;
                        {tree._paths[i].display}
                    </Link>
                </li>
            )
        }

        return (
            <ul className={styles.tree}>
                {nodes}
            </ul>
        )

    }

    render() {

        const tree = this.renderTree(this.props.tree)
        if(!tree) return null

        return (
            <div>
                <h2>Table of Contents</h2>
                {tree}
            </div>
        )
    }

}

export default Tree
