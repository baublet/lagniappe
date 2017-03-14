import React, { Component } from 'react'

class Col extends Component {

  render() {
      return(
          <div className="col">
            {this.props.children}
          </div>
      )
  }

}

export default Col
