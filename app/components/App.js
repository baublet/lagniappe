import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Pages from '../components/Header/Pages'
import Commands from '../components/Commands'
import Footer from '../components/Footer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {lightBlue500, lightBlue900, lightGreenA200} from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue900,
    accent1Color: lightGreenA200,
    pickerHeaderColor: lightBlue500
  }
})

class App extends Component {
  props: {
    children: HTMLElement
  }

  render() {
    return (
      <div className="applicationWindow">
        <Header watchers={this.props.watchers} />
        <Pages router={this.props.router} />
        <div className="mainWindow">
            <MuiThemeProvider muiTheme={muiTheme}>
                {this.props.children}
            </MuiThemeProvider>
        </div>
        <Commands />
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
