import React, { Component } from 'react'
import { connect }          from 'react-redux'

import Header               from 'lagniappe/components/Header'
import Navigation           from 'lagniappe/components/Navigation'
import Commands             from 'lagniappe/components/Commands'
import Footer               from 'lagniappe/components/Footer'

import Startup              from 'lagniappe/components/Startup'

import Split                from 'split.js'

class App extends Component {

    constructor(props)
    {
        super(props)

        this.hsizes = localStorage.getItem('split-horizontal-sizes')
        if (this.hsizes) {
            this.hsizes = JSON.parse(this.hsizes)
        } else {
            this.hsizes = [100, 0]
        }

        this.vsizes = localStorage.getItem('split-vertical-sizes')
        if (this.vsizes) {
            this.vsizes = JSON.parse(this.vsizes)
        } else {
            this.vsizes = [20, 80]
        }
    }

  componentDidMount()
  {
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
            this.hsizes = this.hsplit.getSizes()
            localStorage.setItem('split-horizontal-sizes', JSON.stringify(this.hsizes))
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
            this.vsizes = this.vsplit.getSizes()
            localStorage.setItem('split-vertical-sizes', JSON.stringify(this.vsizes))
        }
    })

  }

  render()
  {
    const router = this.props.router
    const commands = this.props.commands
    const watchers = this.props.watchers

    if(this.hsplit) {
        if(commands.windows.length) {
            if (this.hsizes) {
                this.hsplit.setSizes(this.hsizes)
            }
        } else {
            this.hsplit.setSizes([100, 0])
        }
    }

    return (
      <div className="applicationWindow">
        <Startup />
        <Header watchers={watchers} />
        <div className="sideBarWindowContainer">
            <div className="sideBar" id="sideBar">
                <Navigation router={router} />
            </div>
            <div className="mainWindow" id="mainWindow">
                <div className="mainWindow--viewport" id="page">
                    {this.props.children}
                </div>
                <Commands id="console" commands={commands} />
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
   return {
       watchers: state.watcher,
       commands: state.command
   }
}

export default connect(mapStateToProps)(App)
