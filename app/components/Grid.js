import React, { Component } from 'react'

class Grid extends Component {

  render() {
      return(
          <div className="grid">
            {this.props.children}
          </div>
      )
  }

}

export default Grid
