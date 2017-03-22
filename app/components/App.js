import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Pages from 'components/Header/Pages'
import Commands from 'components/Commands'
import Footer from 'components/Footer'

import Split from 'split.js'

class App extends Component {
  props: {
    children: HTMLElement
  }

  componentDidMount() {

    this.split = Split(['#page', '#console'], {
        direction: 'vertical',
        cursor: 'row-resize',
        elementStyle: (dimension, size, gutterSize) => {
            return {
                'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
            }
        }
    })
  }

  render() {

    return (
      <div className="applicationWindow">
        <Header watchers={this.props.watchers} />
        <Pages router={this.props.router} />
        <div className="mainWindow" id="mainWindow">
            <div className="mainWindow--viewport" id="page">
                {this.props.children}
            </div>
            <Commands id="console" />
        </div>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
   return {
       watchers: state.watcher
   }
}

export default connect(mapStateToProps)(App)
