// @flow
import React, { Component } from 'react'

import Header from '../components/Header'
import Pages from '../components/Header/Pages'
import Commands from '../components/Commands'
import Footer from '../components/Footer'

class App extends Component {
  props: {
    children: HTMLElement
  }

  render() {
    return (
      <div className="applicationWindow">
        <Header />
        <Pages router={this.props.router} />
        <div className="mainWindow">
            {this.props.children}
        </div>
        <Commands />
        <Footer />
      </div>
    )
  }
}

export default App
