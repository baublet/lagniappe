import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Navigation from 'components/Navigation'
import Commands from 'components/Commands'
import Footer from 'components/Footer'

import Startup from 'components/Startup'

import Split from 'split.js'

class App extends Component {

    constructor(props) {
        super(props)

        this.hsizes = localStorage.getItem('split-horizontal-sizes')
        if (this.hsizes) {
            this.hsizes = JSON.parse(this.hsizes)
        } else {
            this.hsizes = [50, 50]
        }

        this.vsizes = localStorage.getItem('split-vertical-sizes')
        if (this.vsizes) {
            this.vsizes = JSON.parse(this.vsizes)
        } else {
            this.vsizes = [20, 80]
        }
    }

  componentDidMount() {

    this.hsplit = Split(['#page', '#console'], {
        sizes: this.hsizes,
        direction: 'vertical',
        cursor: 'row-resize',
        gutterSize: 5,
        elementStyle: (dimension, size, gutterSize) => {
            return {
                'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
            }
        },
        onDragEnd: () => {
            localStorage.setItem('split-horizontal-sizes', JSON.stringify(this.hsplit.getSizes()))
        }
    })

    this.vsplit = Split(['#sideBar', '#mainWindow'], {
        sizes: this.vsizes,
        gutterSize: 5,
        elementStyle: (dimension, size, gutterSize) => {
            return {
                'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
            }
        },
        onDragEnd: () => {
            localStorage.setItem('split-vertical-sizes', JSON.stringify(this.vsplit.getSizes()))
        }
    })

  }

  render() {

    const router = this.props.router

    return (
      <div className="applicationWindow">
        <Startup />
        <Header watchers={this.props.watchers} />
        <div className="sideBarWindowContainer">
            <div className="sideBar" id="sideBar">
                <Navigation router={router} />
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
