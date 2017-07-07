import React, { Component } from 'react'
import { Spin } from 'antd'

const ATTRIBUTES = [
    'width', 'height', 'alt', 'title', 'onClick', 'style', 'className'
]

export default class Image extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            image: false
        }
    }

    componentDidMount()
    {
        const url = this.props.src
        const headers = this.props.headers

        this.setState({
            loading: true,
            image: false,
        })

        this.xhr = new XMLHttpRequest()
        this.xhr.responseType = 'blob'
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState == XMLHttpRequest.DONE && this.xhr.status == 200)
            {
                this.setState({
                    loading: false,
                    image: URL.createObjectURL(this.xhr.response),
                })
            }
        }

        this.xhr.open('GET', url, true)
        for(let prop in headers)
        {
            this.xhr.setRequestHeader(prop, headers[prop])
        }
        this.xhr.send()
    }

    imageAttributes(props)
    {
        const attributes = {}

        for(let prop in props)
        {
            attributes[prop] = props[prop]
        }

        return attributes
    }

    render()
    {
        const loading = this.state.loading
        const loader = this.props.loader ? this.props.loader : <Spin />
        const imageAttributes = this.imageAttributes(this.props)

        return  loading ?
                    loader
                :
                    <img
                        {...imageAttributes}
                        src={this.state.image}
                    />
    }
}
