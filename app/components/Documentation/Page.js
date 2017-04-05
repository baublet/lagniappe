import React, { Component } from 'react'
import fs from 'fs'
import Markdown from 'react-markdown'

class Page extends Component {

    componentWillReceiveProps(nextProps) {
        const path = nextProps.router.location.pathname.substr(5)
        if(this.state && path == this.state.path) return
        this.loadPage(path)
    }

    loadPage(path) {
        this.setState({
            path,
            text: 'Loading...'
        })
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                this.setState({
                    path,
                    text: 'Error loading file (' + path + '): ' + err
                })
                return
            }
            this.setState({
                path,
                text: data
            })
        })
    }

    render() {

        if(!this.state) return null

        const text = this.state.text
        const path = this.state.path

        return (
            <div>
                <Markdown source={text} />
            </div>
        )
    }

}

export default Page
