// pages/_error.js
// by Gavin Smith
// CS4242 Assignment 04
import { Component } from 'react'

export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occured on server`
          : `An error occured on client`
        }
      </p>
    )
  }
}
