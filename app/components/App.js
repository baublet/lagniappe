import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Navigation from 'components/Navigation'
import Commands from 'components/Commands'
import Footer from 'components/Footer'

import Split from 'split.js'

class App extends Component {
  props: {
    children: HTMLElement
  }

  componentDidMount() {

    this.hsplit = Split(['#page', '#console'], {
        direction: 'vertical',
        cursor: 'row-resize',
        gutterSize: 5,
        elementStyle: (dimension, size, gutterSize) => {
            return {
                'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
            }
        }
    })

    this.vsplit = Split(['#sideBar', '#mainWindow'], {
        sizes: [15, 85],
        gutterSize: 5,
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
        <div className="sideBarWindowContainer">
            <div className="sideBar" id="sideBar">
                <Navigation />
            </div>
            <div className="mainWindow" id="mainWindow">
                <div className="mainWindow--viewport" id="page">
                    {this.props.children}
                </div>
                <Commands id="console" />
            </div>
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
