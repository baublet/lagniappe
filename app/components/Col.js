import React, { Component } from 'react'

class Col extends Component {

  render() {
      let span = this.props.span ? parseInt(this.props.span, 10) : 1
      if([3, 6, 9].indexOf(span) === false) span = 3
      const className = "col " + "col--span-" + span + " " + this.props.className
      return(
          <div className={className}>
            {this.props.children}
          </div>
      )
  }

}

export default Col
