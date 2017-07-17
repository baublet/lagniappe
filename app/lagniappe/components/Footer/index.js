import React, { Component } from 'react'
import styles from './Footer.scss'

export default class Footer extends Component
{
    renderCustomFooter()
    {
        const props = this.props
        try {
            const CustomFooter = require('components/Footer')
            return <CustomFooter {...props} />
        } catch(e) {
            if(!e.message.includes('Cannot find module "components/Footer"'))
            {
                console.error(e)
            }
            return <p>This is in the footer</p>
        }
    }

    render()
    {
        return (
            <div className={styles.footer} id="footer">
                {this.renderCustomFooter()}
            </div>
        )
    }
}
