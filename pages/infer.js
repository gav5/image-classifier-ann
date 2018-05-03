// pages/infer.js
// by Gavin Smith
// CS4242 Assignment 05
import { Component } from 'react'
import { Container, Header, Table } from 'semantic-ui-react'
import Net from '../lib/Net'
import trainingData from '../lib/trainingData'
import NetDisplay from '../components/Net'
import Result from '../components/Result'
import { map, first } from 'lodash'

export default class extends Component {
  state = {
    net: Net.perfect()
  }

  render() {
    const { net } = this.state

    return (
      <div>
        <br/>
        <Container>
          <NetDisplay value={net}/>
        </Container>
        <br/>
        <Container>
          <Result value={net}/>
        </Container>
      </div>
    )
  }
}
