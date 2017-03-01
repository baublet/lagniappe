// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>
        <div className="header">
            <Link to="/">RSC DevOps Management</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
