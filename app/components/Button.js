import React, { Component } from 'react'
import { Link } from 'react-router'

class Button extends Component {

  renderLink(className) {
      return (
          <Link {...this.props} className={className}>
              {this.props.children}
          </Link>
      )
  }

  renderButton(className) {
      return (
          <button className={className} {...this.props}>
              {this.props.children}
          </button>
      )
  }

  render() {

    const className = this.props.className ? 'btn ' + this.props.className : 'btn'

    if(this.props.to) return this.renderLink(className)
    return this.renderButton(className)


  }

}

export default Button
